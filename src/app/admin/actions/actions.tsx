"use server"

export async function fetchCategories(){
    const data = await fetch("http://localhost:8080/api/product/category",{
    method: "GET",
    cache: 'no-store',
    next: { tags: ['category']}
    
  })
  const category = await data.json();
  return category
}