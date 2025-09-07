"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { toast } from "sonner";

export default function Settings() {
  const { theme, setTheme } = useTheme();
  const [isChecked, setChecked] = useState(false);
  const handleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      toast("Dark Theme Applied!");
    } else {
      setTheme("light");
      toast("Light Theme Applied!");
    }
  };

  return (
    <Card className="max-w-2xl m-auto mt-14">
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Manage your website settings here.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="necessary" className="flex flex-col space-y-1">
            <span>Theme</span>
            <span className="font-normal leading-snug text-muted-foreground">
              Turn on Dark Mode
            </span>
          </Label>
          <Switch
            id="necessary"
            checked={theme == "dark"}
            onCheckedChange={() => handleTheme()}
          />
        </div>
        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="functional" className="flex flex-col space-y-1">
            <span>Notifications</span>
            <span className="font-normal leading-snug text-muted-foreground">
              Get Your Order Notifications
            </span>
          </Label>
        </div>
        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="performance" className="flex flex-col space-y-1">
            <span>Performance Cookies</span>
            <span className="font-normal leading-snug text-muted-foreground">
              These cookies help to improve the performance of the website.
            </span>
          </Label>
          <Switch id="performance" />
        </div>
      </CardContent>
      <CardFooter>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => toast("Preferences Saved")}
        >
          Save preferences
        </Button>
      </CardFooter>
    </Card>
  );
}
