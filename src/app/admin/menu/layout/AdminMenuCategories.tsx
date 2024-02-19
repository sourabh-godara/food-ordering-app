import { Button } from "@/components/ui/button";
import { z } from "zod";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { revalidateTag } from "next/cache";
import { imageUpload } from "@/lib/imageUpload";
import { Category } from "@/app/api/models/categoryModel";

async function createCategory(formData: FormData) {
  "use server";
  const formParse = z.object({
    name: z
      .string()
      .min(1)
      .max(30, { message: "Maximum 30 Characters are allowed" }),
    imageUrl: z.string().url(),
  });
  const name = formData.get("name") as String;
  const image = formData.get("image") as File;
  const imageUrl = await imageUpload(image);
  const safeParsed = formParse.safeParse({
    name,
    imageUrl,
  });
  if (safeParsed.success === false) {
    return {
      errors: safeParsed.error.flatten().fieldErrors,
    };
  } else {
    await Category.create(safeParsed.data);
    revalidateTag("category");
  }
}
export default async function CategoriesTable({ category }: any) {
  return (
    <Card className='p-4'>
      <div className='flex justify-between items-center'>
        <div>
          <CardHeader className='p-2'>
            <CardTitle>Categories</CardTitle>
            <CardDescription>List of categories of items</CardDescription>
          </CardHeader>
        </div>
        <div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Add Category</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Category</DialogTitle>
                <DialogDescription>
                  Enter the name of category to add
                </DialogDescription>
              </DialogHeader>
              <form action={createCategory} className='flex flex-col gap-2'>
                <Input name='name' placeholder='Enter Name' />
                <Input
                  type='file'
                  name='image'
                  accept='image'
                  placeholder='Upload Image'
                />
                <Button>Reset</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No.</TableHead>
            <TableHead className='px-5'>Category</TableHead>
            <TableHead className='px-5'>Status</TableHead>
            {/*  <TableHead className="px-5">Action</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {category?.map((category, index) => (
            <TableRow key={index}>
              <TableCell className='font-medium'>{index + 1}</TableCell>
              <TableCell className='px-5'>{category.name}</TableCell>
              <TableCell className='px-5'>
                {category.isActive ? "Active" : "Disables"}
              </TableCell>
              <TableCell className='flex gap-2'>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant='ghost' className='h-8 w-8 p-0'>
                      <span className='sr-only'>Open menu</span>
                      <DotsHorizontalIcon className='h-4 w-4' />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='end'>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Disable</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
