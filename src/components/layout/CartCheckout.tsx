"use client";
import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { getSession, useSession } from "next-auth/react";

function CartCheckout({ data }) {
  const { status } = useSession();
  if (status === "unauthenticated") {
    return null;
  }
  const totalPrice = data?.reduce((total, data) => {
    total += parseInt(data.prices[0].price);
    return total;
  }, 0);

  return (
    <div className='absolute bottom-6 w-full'>
      <div>
        <div className='mb-4 text-sm text-right mr-12'>
          <div className='t'>
            Total: <strong>${totalPrice}</strong>
          </div>
          <div className='text-sm'>
            Quantity: x <strong>{data?.length}</strong>
          </div>
        </div>
        <div className='flex items-center justify-center mr-7'>
          <Button className='w-[90%]'>Checkout</Button>
        </div>
      </div>
    </div>
  );
}

export default CartCheckout;
