import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth";
import mongoose from "mongoose";
import { User } from "../../models/userModel";
import bcrypt from "bcrypt";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/MongoAdapter";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: MongoDBAdapter(clientPromise),

  pages: {
    signIn: "/signIn",
  },
  providers: [
    GoogleProvider({
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: profile.role ?? "user",
        };
      },

      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "credentials",
      id: "credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email;
        const password = credentials?.password;
        try {
          mongoose.connect(process.env.MONGODB_URI);
          const user = await User.findOne({ email });
          const passwordOk =
            user && bcrypt.compareSync(password, user.password);

          if (passwordOk) {
            return user;
          } else {
            return null;
          }
        } catch (error) {
          throw new Error(error);
        }
      },
    }),
  ],

  callbacks: {
    session({ session, user }) {
      session.user.role = user.role;
      session.user.id = user.id;
      return session;
    },
  },
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
