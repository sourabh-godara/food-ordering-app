"use client";
import React from "react";
import { Button } from "../ui/button";

function CartCheckout({ data }) {
  const totalPrice = data.reduce((total, data) => {
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
            Quantity: x <strong>{data.length}</strong>
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
