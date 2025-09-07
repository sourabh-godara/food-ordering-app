import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function page() {
  return (
    <>
      <div className="border-2 p-4 rounded mt-5 m-auto md:w-3/4">
        <div>
          <div className="flex justify-between">
            <div className="font-medium">Order #1213</div>
            <div className="font-semibold text-sm">
              Status:{" "}
              <span className=" text-green-700 font-semibold">Delivered</span>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <div>
            <h1 className="font-bold text-lg ">Burger With Extra Cheese</h1>
            <h3 className="text-xs opacity-80">
              Rs.323.43 | <span>01 Jan, 12:42 PM</span>
            </h3>
          </div>
          <div className="mt-4">
            {/* <button className="px-4 py-1.5 rounded-xl text-white bg-primary text-sm">Rate Your Order</button> */}
            <Dialog>
              <DialogTrigger className="px-4 py-1.5 rounded-xl text-white bg-primary text-sm">
                Rate Your Order
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="m-auto">Rate Your Order</DialogTitle>
                </DialogHeader>
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Close
                  </Button>
                </DialogClose>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </>
  );
}
