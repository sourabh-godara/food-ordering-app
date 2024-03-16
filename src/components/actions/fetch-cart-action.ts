import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export default async function fetchCart() {
  const session = await getServerSession(authOptions);
  if (session?.user) {
    try {
      const res = await fetch(`${process.env.BASE_URL}api/cart`, {
        body: JSON.stringify(session.user?.id),
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
