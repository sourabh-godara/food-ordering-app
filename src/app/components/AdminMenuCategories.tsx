import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const invoices = [
  {
    invoice: "Veg",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
];

export default function CategoriesTable() {
  return (
    <Card className="w-[30vw] p-4">
      <div className=" flex justify-between items-center">
        <div>
          <CardTitle className="text-lg">Categories</CardTitle>
          <CardDescription className="mt-1">
            List of categories of items
          </CardDescription>
        </div>
        <div>
            <Button variant={"outline"} className="w-28 h-8 text-xs">Add Category</Button>
        </div>
      </div>
      <Table className="mt-2">
        <TableHeader>
          <TableRow>
            <TableHead>Category</TableHead>
            <TableHead className="px-10">Total Items</TableHead>
            <TableHead className="text-right px-8">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.invoice}>
              <TableCell className="font-medium">{invoice.invoice}</TableCell>
              <TableCell className="px-10">10</TableCell>
              <TableCell className="text-right">
                <Button
                  variant={"outline"}
                  className="h-6 w-18 hover:bg-primary"
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
