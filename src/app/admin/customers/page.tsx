import { Payment, columns } from "./payments/columns";
import { DataTable } from "./payments/data-table";
import { CustomerCards } from "../../components/AdminCards";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      name: "Sourabh",
      amount: 100,
      status: "pending",
      role: "admin",
      email: "godarasourav181@gmail.com",
    },
    {
      id: "728ed52p",
      name: "Shubh",
      amount: 200,
      status: "pending",
      role: "user",
      email: "m@example.com",
    },
    {
      id: "728ed52i",
      name: "Vishal",
      amount: 500,
      status: "pending",
      role: "user",
      email: "m@example.com",
    },
    {
      id: "728ed59f",
      name: "Sahil",
      amount: 150,
      status: "pending",
      role: "user",
      email: "m@example.com",
    },
    // ...
  ];
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <>
      <div className="w-[80vw] mt-7">
        <CustomerCards />
        <div className="w-[60vw] py-8">
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </>
  );
}
