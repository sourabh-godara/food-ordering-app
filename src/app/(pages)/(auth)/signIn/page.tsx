"use client";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { FormEvent, useState, useTransition } from "react";
import { z, ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import Loading from "@/components/layout/Loading";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { toast } from "sonner";

export default function Page() {
  const { status } = useSession();
  const [isPending, startTransition] = useTransition();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  if (status === "authenticated") {
    return redirect("/");
  }
  const signInSchema = z.object({
    email: z
      .string()
      .min(4, { message: "Email must be at least 4 characters long." })
      .email({ message: "Enter a valid email address." }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long." })
      .max(20, { message: "Password must be at most 20 characters long." }),
  });

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      signInSchema.parse({ email, password });
      await signIn("credentials", { email, password, callbackUrl: "/" });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        const errorMessage = validationError.details[0].message;
        toast.error(errorMessage);
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  }
  return (
    <section className="flex items-center justify-center h-screen font-poppins">
      <div className="flex-1">
        <div className="px-2 mx-auto max-w-7xl lg:px-4">
          <div className="relative ">
            <div className="relative px-4 py-4 md:py-11 sm:px-8">
              <div className="max-w-lg mx-auto text-center">
                <h2 className="mb-4 text-5xl font-bold  md:text-6xl">
                  F<span className="text-primary">oo</span>dy
                </h2>
                <form onSubmit={handleLogin} className="mt-4 lg:mt-7 ">
                  <div>
                    <input
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      className="w-full px-4 py-3 mt-2  rounded-lg lg:py-5"
                      name="email"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className="mt-4 lg:mt-7">
                    <div>
                      <div className="relative flex items-center">
                        <input
                          type={visible ? "text" : "password"}
                          onChange={(e) => setPassword(e.target.value)}
                          value={password}
                          className="w-full px-4 py-3 rounded-lg lg:py-5 "
                          name="password"
                          placeholder="Enter password"
                        />
                        <div
                          className="right-4 absolute"
                          onClick={() => setVisible(!visible)}
                        >
                          {visible ? (
                            <IoEyeOffOutline color="black" />
                          ) : (
                            <IoEyeOutline color="black" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center justify-between mt-5 lg:mt-7">
                    <label className="flex">
                      <input type="checkbox" className="mt-1 mr-4 bg-primary" />
                      <span className="text-sm ">Remember me</span>
                    </label>
                    <a
                      href=" #"
                      className="text-sm font-semibold text-primary lg:mt-0 hover:underline"
                    >
                      Forgot Password?
                    </a>
                  </div>
                  <Button
                    className="w-full mt-6 disabled:bg-zinc-900 bg-accent hover:bg-zinc-700 transition-all duration-300"
                    variant="ghost"
                    type="submit"
                    disabled={isPending}
                  >
                    Login
                  </Button>
                </form>
                <Button
                  onClick={() =>
                    startTransition(async () => {
                      toast.loading("Logging in...");
                      await signIn("google", {
                        callbackUrl: "/",
                      });
                    })
                  }
                  disabled={isPending}
                  className="w-full mt-2 hover:bg-red-700 transition-all duration-300"
                >
                  {isPending ? <Loading /> : "Sign In With Google"}
                </Button>
                <p className="mt-4 text-xs text-gray-700 lg:mt-7 dark:text-gray-400 lg:text-base">
                  Need an account? &nbsp;
                  <Link
                    href="/register"
                    className="font-semibold text-primary hover:text-red-600"
                  >
                    Create an account
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
