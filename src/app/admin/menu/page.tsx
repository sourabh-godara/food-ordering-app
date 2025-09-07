import { fetchCategories } from "@/app/actions/handleCategories";
import AdminMenuCategories from "./layout/AdminMenuCategories";
import AdminMenuForm from "./layout/AdminMenuForm";
import React from "react";

export default async function page() {
  const { data, error } = await fetchCategories();
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-gray-900">
          Something went wrong!
        </h1>
      </div>
    );
  }
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <AdminMenuCategories category={data} />
        <AdminMenuForm category={data} />
      </div>
    </>
  );
}
