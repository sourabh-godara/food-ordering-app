import React from "react";
import Overview from "../components/AdminOverview";
import RecentSales from "../components/AdminRecentSales";
import Header from "../components/AdminHeader";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {OverviewCards} from "../components/AdminCards";

export default function page() {
  return (
    <>
      <OverviewCards />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-5">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription>You made 265 sales this month.</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentSales />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
