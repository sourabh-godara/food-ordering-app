"use server";
import "server-only";
import connectDB from "@/lib/connectDB";
import Product from "@/app/api/models/productModel";
import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";
import { imageUpload } from "@/lib/handleUpload";
import setPrices from "../admin/libs/setPrices";
import { z } from "zod";

const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1 MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
];

const ProductSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().min(2).max(450),
  category: z.string(),
  prices: z.any(),
  image: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: "Image must be less than 2MB",
    })
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: "Only .jpg, .png, .webp, .avif formats are supported",
    }),
});

export async function createProduct(formData: FormData) {
  const name = formData.get("name");
  const description = formData.get("description");
  const category = formData.get("category");
  const price = formData.getAll("price");
  const prices = await setPrices(price);
  const image = formData.get("image") as File;

  let safeParsed = ProductSchema.safeParse({
    name,
    description,
    category,
    prices,
    image,
  });
  if (!safeParsed.success) {
    return { success: false, message: z.prettifyError(safeParsed.error) };
  }
  const imageUrl = await imageUpload(image);
  if (!imageUrl.success) {
    return { success: false, message: "Something went wrong" };
  }

  delete safeParsed.data.image;

  await Product.create({ ...safeParsed.data, imageUrl: imageUrl.url });
  revalidateTag("products");
  revalidatePath("/menu/all");
  return {
    success: true,
    message: "Product Created!",
  };
}

export const fetchProducts = unstable_cache(
  async (category) => {
    try {
      await connectDB();
      const res = await Product.find({ category: category });
      return { data: res, error: null };
    } catch (error) {
      console.error("Error fetching products:", error);
      return { data: null, error: true };
    }
  },
  ["products"],
  { revalidate: 3600, tags: ["products"] }
);
