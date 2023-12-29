import Link from "next/link";
import { IoBagOutline } from "react-icons/io5";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IoMdArrowDropdown } from "react-icons/io";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React from "react";
import { getServerSession } from "next-auth";
import ClientButton from "../ClientButton";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Navbar() {
  const session = await getServerSession(authOptions);
  console.log(session?.user);
  return (
    <nav className="flex justify-between">
      <div className="flex gap-24 items-center">
        <Link href={"/"} className=" font-bold text-2xl">
          F<span className="text-primary">oo</span>
          dy
        </Link>
        <div className="md:flex hidden gap-12 font-semibold ">
          <Link href={"/"}>Home</Link>
          <Link href={"/Menu"}>Menu</Link>
          <Link href={"/user/orders"}>Orders</Link>
          <Link href={""}>About</Link>
        </div>
      </div>
      <div className="flex gap-8 items-center ">
        <Link href={""}>
          <IoBagOutline size={26} />
        </Link>
        {session ? (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger className=" font-medium font-sans flex items-center gap-1">
                <div className="w-8">
                  <Avatar>
                    <AvatarImage src={session?.user?.image} />
                    <AvatarFallback>
                      {session?.user?.name.match(/[A-Z]/g).join("")}
                    </AvatarFallback>
                  </Avatar>
                </div>

                {/* <CiUser size={20}/> */}
                {session?.user?.name}
                <IoMdArrowDropdown size={18} />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem className="hover:font-semibold">
                  <Link href={"/user/profile"}>Your Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="hover:font-semibold">
                  <Link href={"/user/orders"}>Orders</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:font-semibold">
                  <Link href={"/user/address"}>Address</Link>
                </DropdownMenuItem>

                <DropdownMenuItem className="hover:font-semibold">
                  <Link href={"/user/setting"}>Setting</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className=" hover:font-bold hover:text-red-700">
                  <ClientButton title="Logout" />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* <div className="text-sm"> {session?.user?.name}Profile </div>
          <LogOut/> */}
          </>
        ) : (
          <>
            {" "}
            <Link href={"/SignIn"} className=" font-semibold">
              Login
            </Link>
            <Link
              href={"/Register"}
              className=" md:inline hidden bg-primary text-white rounded-full px-5 py-1.5"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
