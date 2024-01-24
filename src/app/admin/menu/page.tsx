import AdminMenuCategories from "@/components/layout/AdminMenuCategories";
import AdminMenuForm from "@/components/AdminMenuForm";
import React from "react";
import { fetchCategories } from "../actions/actions";

export default async function page() {
  const {data} = await fetchCategories();
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <AdminMenuCategories category={data} />
        <AdminMenuForm category={data} />
      </div>
    </>
  );
}
