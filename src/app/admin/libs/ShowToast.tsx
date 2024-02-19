"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export function ShowToast() {
  const { toast } = useToast();
  toast({
    title: "Scheduled: Catch up",
    description: "Friday, February 10, 2023 at 5:57 PM",
  });
  return (
    <>
      <div className='text-2xl bg-white w-72'>hicaca</div>
    </>
  );
}
