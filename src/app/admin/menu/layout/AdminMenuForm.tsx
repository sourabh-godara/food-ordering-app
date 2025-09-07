"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTransition } from "react";
import { toast } from "sonner";
import Loading from "@/components/layout/Loading";
import { createProduct } from "@/app/actions/handleProducts";

export default function MenuForm({ category }: any) {
  const [isPending, startTransition] = useTransition();
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Add Item</CardTitle>
          <CardDescription>Add Item to the menu</CardDescription>
        </CardHeader>
        <form
          action={(formData) => {
            startTransition(async () => {
              const res = await createProduct(formData);
              if (res.success) {
                toast.success("Product Added");
              } else {
                toast.error(res.message);
              }
            });
          }}
        >
          <CardContent className="grid gap-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" placeholder="Enter Item Name" />
              </div>
              <div className="grid gap-2 ">
                <Label htmlFor="extra-ingredients">Image</Label>
                <Input
                  id="extra"
                  type="file"
                  accept="image/*"
                  name="image"
                  placeholder="Cheese, Spicy..."
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="area">Category</Label>
                <Select defaultValue="Pizza" name="category">
                  <SelectTrigger id="area">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {category?.map((category) => (
                      <SelectItem value={category.name} key={category._id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  name="quantity"
                  type="number"
                  placeholder="Quantity"
                ></Input>
              </div>
              <div className="grid gap-2 w-full">
                <Label htmlFor="security-level">Price</Label>
                <div className="grid grid-flow-col gap-2">
                  <Input
                    id="smallprice"
                    name="price"
                    placeholder="Small"
                  ></Input>
                  <Input
                    id="mediumprice"
                    name="price"
                    placeholder="Medium"
                  ></Input>
                  <Input
                    id="largeprice"
                    name="price"
                    placeholder="Large"
                  ></Input>
                </div>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                name="description"
                placeholder="Description for your item"
              />
            </div>
          </CardContent>

          <CardFooter className="justify-between space-x-2">
            <Button type="reset" variant="ghost">
              Reset
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className=" hover:bg-red-700 disabled:bg-red-800"
            >
              {isPending ? <Loading /> : "Add"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </>
  );
}
