"use server"
import { z } from "zod";
import { imageUpload } from "@/lib/imageUpload";
import { revalidateTag } from "next/cache";


export async function fetchCategories(){
    const data = await fetch(`${process.env.BASE_URL}api/product/category`,{
    method: "GET",
    cache: 'no-store',
    next: { tags: ['category']}
    
  })
  const category = await data.json();
  return category
}

export async function createCategory(formData: FormData) {
  "use server";
  
  const formParse = z.object({
    name: z
      .string()
      .min(1)
      .max(30, { message: "Maximum 30 Characters are allowed" }),
    imageUrl: z.string().url(),
  });
  const name = formData.get("name") as String;
  const image = formData.get("image") as File;
  const imageUrl =  `http://localhost:3000/api/product/category/create`/* await imageUpload(image) */; 
  const safeParsed = formParse.safeParse({
    name,
    imageUrl,
  });
  if (safeParsed.success) {
    fetch(`${process.env.BASE_URL}api/product/category/create`, {
      method: "POST",
      cache: "no-store",
      body: JSON.stringify(safeParsed.data),
    });
    revalidateTag('category')
  }else{
    console.log(safeParsed.error)
  }
}