import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      role: string;
      id: string;
    } & DefaultSession["user"];
  }

  interface Profile {
    id: string;
    role: string;
    email: string;
    image: string;
    role: "user" | "admin";
    emailVerified: boolean;
  }
}
