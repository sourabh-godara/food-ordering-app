"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className=" hover:bg-red-700 disabled:bg-red-800"
    >
      Add
    </Button>
  );
}
