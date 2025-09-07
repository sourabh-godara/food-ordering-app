import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IoMdArrowDropdown } from "react-icons/io";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import React from "react";
import ClientButton from "./ClientButton";
import CartModal from "./CartModal";
import { getServerSession } from "next-auth";
import { Button } from "../ui/button";
import { authOptions } from "@/lib/authOptions";

export default async function Navbar() {
  const session = await getServerSession(authOptions);
  return (
    <nav className="flex  justify-between">
      <div className="flex gap-24 items-center">
        <Link href={"/"} className=" font-bold text-2xl">
          F<span className="text-primary">oo</span>
          dy
        </Link>
        <div className="md:flex hidden gap-12 font-medium antialiased ">
          <Link
            href={"/"}
            className="hover:text-red-800 transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            href={"/menu/all"}
            className="hover:text-red-800 transition-colors duration-200"
          >
            Menu
          </Link>
          <Link
            href={"/user/orders"}
            className="hover:text-red-800 transition-colors duration-200"
          >
            Orders
          </Link>
        </div>
      </div>
      <div className="flex gap-8 items-center ">
        {session?.user.role === "admin" ? (
          <Button asChild>
            <Link href={"/admin"} target="_blank">
              Admin Dashboard
            </Link>
          </Button>
        ) : null}
        {session && (
          <span className=" hover:cursor-pointer">
            <CartModal />
          </span>
        )}

        {session ? (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger className=" font-medium font-sans flex items-center gap-1">
                <div className="w-8">
                  <Avatar>
                    <AvatarImage src={session?.user?.image} />
                    <AvatarFallback>
                      {session?.user?.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </div>
                {session?.user?.name}
                <IoMdArrowDropdown size={18} />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <Link href={"/user/profile"}>
                  <DropdownMenuItem className="hover:font-semibold">
                    Your Profile
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <Link href={"/user/orders"}>
                  <DropdownMenuItem className="hover:font-semibold">
                    Orders
                  </DropdownMenuItem>
                </Link>
                <Link href={"/user/address"}>
                  <DropdownMenuItem className="hover:font-semibold">
                    Address
                  </DropdownMenuItem>
                </Link>
                <Link href={"/user/setting"}>
                  <DropdownMenuItem className="hover:font-semibold">
                    Setting
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <DropdownMenuItem className=" hover:font-bold hover:text-red-700">
                  <ClientButton title="Logout" />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <>
            <Link href={"/signIn"} className="font-medium">
              Login
            </Link>
            <Link
              href={"/register"}
              className=" md:inline hidden bg-primary text-white font-medium rounded-full px-5 py-1.5"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
