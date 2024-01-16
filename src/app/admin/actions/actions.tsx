"use server"

export async function fetchCategories(){
    const data = await fetch(`${process.env.BASE_URL}api/product/category`,{
    method: "GET",
    cache: 'no-store',
    next: { tags: ['category']}
    
  })
  const category = await data.json();
  return category
}