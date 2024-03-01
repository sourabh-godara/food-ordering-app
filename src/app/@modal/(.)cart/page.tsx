import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import CartModal from "@/components/CartModal";
import { getServerSession } from "next-auth";
import React from "react";
async function fetchCart() {
  const { user } = await getServerSession(authOptions);
  if (user) {
    try {
      const res = await fetch(`${process.env.BASE_URL}api/cart`, {
        body: JSON.stringify(user.id),
        next: { tags: ["cart"] },
        method: "POST",
        credentials: "include",
      });
      const { data, error } = await res.json();
      if (error) {
        return { data: null, error: true };
      }
      return { data: data, error: false };
    } catch (error) {
      console.log(error);
      return { data: null, error: true };
    }
  }
  return { data: null, error: true };
}

async function page() {
  const { data, error } = await fetchCart();
  return <CartModal data={data} />;
}

export default page;
