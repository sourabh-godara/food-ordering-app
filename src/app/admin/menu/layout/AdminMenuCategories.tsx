"use client";
import { Button } from "@/components/ui/button";
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
import { toast } from "sonner";
import { useTransition } from "react";
import Loading from "@/components/layout/Loading";
import createCategory from "@/app/actions/handleCategories";

export default function CategoriesTable({ category }: any) {
  const [isPending, startTransition] = useTransition();

  return (
    <Card className="p-4">
      <div className="flex justify-between items-center">
        <div>
          <CardHeader className="p-2">
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
              <form
                action={(formData) => {
                  startTransition(async () => {
                    const res = await createCategory(formData);
                    if (res.success) {
                      toast.success("New Category Added");
                    } else {
                      toast.error(res.message);
                    }
                  });
                }}
                className="flex flex-col gap-2"
              >
                <Input name="name" placeholder="Enter Name" />
                <p className="text-xs text-right text-red-700">
                  *Image size limit is 1 MB.
                </p>
                <Input
                  type="file"
                  name="image"
                  accept="image"
                  placeholder="Upload Image"
                />

                <Button disabled={isPending} type="submit">
                  {isPending ? <Loading /> : "Add"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No.</TableHead>
            <TableHead className="px-5">Category</TableHead>
            <TableHead className="px-5">Status</TableHead>
            {/*  <TableHead className="px-5">Action</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {category?.map((category, index) => (
            <TableRow key={category._id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell className="px-5">{category.name}</TableCell>
              <TableCell className="px-5">
                {category.isActive ? "Active" : "Disables"}
              </TableCell>
              <TableCell className="flex gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <DotsHorizontalIcon className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() =>
                        toast.warning("This feature is not implemented yet!")
                      }
                    >
                      Delete
                    </DropdownMenuItem>
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
