"use server";
import "server-only";
import Category from "@/app/api/models/categoryModel";
import connectDB from "@/lib/connectDB";
import { unstable_cache } from "next/cache";
import { revalidateTag, revalidatePath } from "next/cache";
import { imageUpload } from "@/lib/handleUpload";
import z from "zod";

const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1 MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
];

const categoryFormSchema = z.object({
  name: z.string({ message: "Enter valid input" }).min(2).max(50),
  image: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: "Image must be less than 2MB",
    })
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: "Only .jpg, .png, .webp, .avif formats are supported",
    }),
});

export default async function createCategory(formData: FormData) {
  const category = Object.fromEntries(formData.entries());
  const safeParsed = categoryFormSchema.safeParse(category);

  if (!safeParsed.success) {
    return { success: false, message: z.prettifyError(safeParsed.error) };
  }
  const imageUrl = await imageUpload(safeParsed.data.image);
  if (!imageUrl.success) {
    return { success: false, message: "Something went wrong" };
  }

  await Category.create({ name: safeParsed.data.name, imageUrl: imageUrl.url });

  revalidateTag("category");
  revalidatePath("/admin/menu");

  return { success: true, message: "success" };
}

export const fetchCategories = unstable_cache(
  async () => {
    try {
      await connectDB();
      const res = await Category.find();
      return { data: JSON.parse(JSON.stringify(res)), error: null };
    } catch (error) {
      console.log("Error fetching categories ", error.message);
      return { data: [], error: true };
    }
  },
  ["category"],
  { revalidate: 3600, tags: ["category"] }
);
