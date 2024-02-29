import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import CartModal from "@/components/ui/CartModal";
import { getServerSession } from "next-auth";
import React from "react";

async function page() {
  return <div>hi from intercepted</div>;
}

export default page;
