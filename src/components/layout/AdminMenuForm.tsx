import { imageUpload } from "@/lib/imageUpload";
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
import { z } from "zod";
import Image from "next/image";
import { toast } from "@/components/ui/use-toast";
import { SubmitButton } from "../ui/submit-button";
import { createItem } from "@/app/admin/actions/actions";
import { revalidateTag } from "next/cache";

export default async function MenuForm({category}:any) {
  async function createCategory(formData: FormData) {
  const formParse = z.object({
    name: z
      .string()
      .min(1)
      .max(30, { message: "Maximum 30 Characters are allowed" }),
    imageUrl: z.string().url(),
  });
  const name = formData.get("name") as String;
  const image = formData.get("image") as File;
  const imageUrl =  await imageUpload(image)
  const safeParsed = formParse.safeParse({
    name,
    imageUrl,
  });
  if (safeParsed.success === false) {
    return {
      errors:safeParsed.error.flatten().fieldErrors,
    }
  }else{
    fetch(`${process.env.BASE_URL}api/product/category/create`, {
      method: "POST",
      cache: "no-store",
      body: JSON.stringify(safeParsed.data),
    });
    revalidateTag('category')
  }
}

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Add Item</CardTitle>
          <CardDescription>Add Item to the menu</CardDescription>
        </CardHeader>
        <form action={createItem}>
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
                    {category?.map((category,index)=><SelectItem value={category.name} key={index} >{category.name}</SelectItem>)}
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
                placeholder="Please include all information relevant to your issue."
              />
            </div>
          </CardContent>

          <CardFooter className="justify-between space-x-2">
            <Button variant="ghost">Reset</Button>
            <SubmitButton/>
          </CardFooter>
        </form>
      </Card>
    </>
  );
}
