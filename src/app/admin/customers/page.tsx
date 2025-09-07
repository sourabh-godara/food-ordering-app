import { columns } from "./payments/columns";
import { DataTable } from "./payments/data-table";
import { CustomerCards } from "../layout/OverviewCards";
import connectDB from "@/lib/connectDB";
import User from "@/app/api/models/userModel";

async function getData() {
  "use server";
  try {
    await connectDB();
    const res = await User.find();
    return { data: res, error: null };
  } catch (error) {
    console.log("Error fetching categories ", error);
    return { data: null, error: true };
  }
}

export default async function Page() {
  const { data, error } = await getData();
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
      <div className="w-[80vw] mt-7">
        <CustomerCards />
        <div className="w-[60vw] py-8">
          <DataTable
            columns={columns}
            data={JSON.parse(JSON.stringify(data))}
          />
        </div>
      </div>
    </>
  );
}
