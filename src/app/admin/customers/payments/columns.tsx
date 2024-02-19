"use client";
import { Button } from "@/components/ui/button";
import { User } from "@/types/userType";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: () => <div className='mr-4'>Role</div>,
  },
  {
    accessorKey: "Options",
    header: "Options",
    cell: () => (
      <Button className=' h-6 text-xs' variant='outline'>
        Make Admin
      </Button>
    ),
  },
];
