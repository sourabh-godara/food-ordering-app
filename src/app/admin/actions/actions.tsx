"use server"
import { z } from "zod";
import { imageUpload } from "@/lib/imageUpload";
import { revalidateTag } from "next/cache";

export async function createCategory(formData: FormData) {
  const formParse = z.object({
    name: z
      .string()
      .min(1)
      .max(30, { message: "Maximum 30 Characters are allowed" }),
    imageUrl: z.string().url(),
  });
  const name = formData.get("name") as String;
  const image = formData.get("image") as File;
  const imageUrl =  await imageUpload(image)
  const safeParsed = formParse.safeParse({
    name,
    imageUrl,
  });
  if (safeParsed.success === false) {
    return {
      errors:safeParsed.error.flatten().fieldErrors,
    }
  }else{
    fetch(`${process.env.BASE_URL}api/product/category/create`, {
      method: "POST",
      cache: "no-store",
      body: JSON.stringify(safeParsed.data),
    });
    revalidateTag('category')
  }
}

export async function createItem(formData: FormData) {
  const formParse = z.object({
    name: z.string().min(2).max(50),
    description: z.string().min(2).max(450),
    category: z.string(),
    price: z.any(),
    quantity: z.any(),
    imageUrl: z.string().url(),
  });
  const name = formData.get("name");
  const description = formData.get("description");
  const category = formData.get("category");
  const price = formData.getAll("price");
  const quantity = formData.get("quantity");
  const image = formData.get("image") as File;

  const imageUrl = 'http://localhost:3000/menu/sample' /* await imageUpload(image); */
  console.log(imageUrl);
  const safeParsed = formParse.safeParse({
    name,
    description,
    category,
    price,
    quantity,
    imageUrl,
  });
  if (safeParsed.success) {
    const data = safeParsed.data;
    fetch(`${process.env.BASE_URL}api/product/create`, {
      method: "POST",
      cache: "no-store",
      body: JSON.stringify(safeParsed.data),
    });
    
  } else {
    console.log(safeParsed.error);
  }
}