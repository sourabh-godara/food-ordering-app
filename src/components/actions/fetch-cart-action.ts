import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

// Define the types for the session user and fetch response
interface SessionUser {
  id: string;
}

interface FetchCartResponse {
  data: any;
  error: boolean;
}

// Define the return type for the fetchCart function
export default async function fetchCart(): Promise<FetchCartResponse> {
  try {
    // Get the user session
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return { data: null, error: true };
    }

    const userId = (session.user as SessionUser).id;
    const res = await fetch(`${process.env.BASE_URL}api/cart`, {
      body: JSON.stringify({ userId }),
      next: { tags: ["cart"] },
      method: "POST",
      credentials: "include",
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!res.ok) {
      console.error(`HTTP error! Status: ${res.status}`);
      return { data: null, error: true };
    }

    const result = await res.json();

    if (result.error) {
      return { data: null, error: true };
    }

    return { data: result.data, error: false };

  } catch (error) {
    console.error("Fetch cart error:", error);
    return { data: null, error: true };
  }
}
