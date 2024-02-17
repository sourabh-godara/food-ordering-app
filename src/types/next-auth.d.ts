import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      role: string
    } & DefaultSession["user"]
  }
  interface Profile {
    id: string,
    role: string,
    email: string,
    image: string,
    role: string,
    emailVerified:boolean,
  }
}