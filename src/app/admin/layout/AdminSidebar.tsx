"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PiUsersLight } from "react-icons/pi";
import { IoBagHandleOutline } from "react-icons/io5";
import { BiFoodMenu } from "react-icons/bi";
import { MdReportProblem } from "react-icons/md";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <div className={cn("pb-12 hidden md:inline-block")}>
      <div className='space-y-4 py-5'>
        <div className='px-3 py-3'>
          <h2 className='mb-3 px-4 text-xl font-semibold tracking-tight'>
            Dashboard
          </h2>
          <div className=' space-y-2'>
            <Link href={"/admin"}>
              <Button
                variant={`${pathname === "/admin" ? "secondary" : "ghost"}`}
                className='w-full justify-start '>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='mr-3 h-4 w-4'>
                  <circle cx='12' cy='12' r='10' />
                  <polygon points='10 8 16 12 10 16 10 8' />
                </svg>
                Overview
              </Button>
            </Link>

            <Link href={"/admin/customers"}>
              <Button
                variant={`${pathname === "/admin/customers" ? "secondary" : "ghost"
                  }`}
                className='w-full gap-2 justify-start mt-2'>
                <PiUsersLight size={20} />
                Customers
              </Button>
            </Link>

            <Link href={"/admin/orders"}>
              <Button
                variant={`${pathname === "admin/orders" ? "secondary" : "ghost"
                  }`}
                className='w-full gap-2 justify-start mt-2'>
                <IoBagHandleOutline size={20} />
                Orders
              </Button>
            </Link>
            <Link href={"/admin/menu"}>
              <Button
                variant={`${pathname === "admin/menu" ? "secondary" : "ghost"}`}
                className='w-full gap-2 justify-start mt-2'>
                <BiFoodMenu size={20} />
                Manage Menu
              </Button>
            </Link>

            {/*             <Accordion type="multiple">
              <AccordionItem value="item-1">
                <AccordionTrigger className="p-0">
                  <Button
                    variant="ghost"
                    className="w-full gap-2 justify-start"
                  >
                    <BiFoodMenu size={20} />
                    Menu
                  </Button>
                </AccordionTrigger>

                <AccordionContent className="ml-2">
                  <Link href={"admin/menu"}>
                    <Button
                      variant={`${
                        pathname === "admin/menu" ? "secondary" : "ghost"
                      }`}
                      className="w-full gap-2 justify-start mt-2"
                    >
                      <BiFoodMenu size={20} />
                      Manage Menu
                    </Button>
                  </Link>
                </AccordionContent>
              </AccordionItem>
            </Accordion>*/}

            <Link href={"/admin/reports"}>
              <Button
                variant={`${pathname === "/admin/reports" ? "secondary" : "ghost"
                  }`}
                className='w-full gap-2 justify-start mt-2'>
                <MdReportProblem size={20} />
                Reports
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
