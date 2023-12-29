"use client";
import { useFormStatus } from "react-dom";
import React from "react";

export default function SubmitBtn() {
  const { pending } = useFormStatus();
  return (
    <button
    disabled={pending}
      className="w-full py-3 text-lg font-bold text-gray-200 uppercase bg-primary disabled:bg-red-800 disabled:hover:bg-red-800 rounded-md lg:mt-7 mt-7 px-11 md:mt-7 hover:bg-red-600"
      type="submit"
    >
      SIGNUP
    </button>
  );
}
