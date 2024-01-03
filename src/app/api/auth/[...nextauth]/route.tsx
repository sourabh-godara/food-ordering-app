import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth"
import mongoose from "mongoose";
import { User } from "../../models/userModel";
import bcrypt from "bcrypt";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/MongoAdapter";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: MongoDBAdapter(clientPromise),
  pages: {
    signIn: '/signIn',
  },
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
      }),
        CredentialsProvider({
          name: 'credentials',
          id:'credentials',
          credentials: {
            email: { label: "email", type: "email" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials, req) {
            const {email,password} = credentials;
            mongoose.connect(process.env.MONGODB_URI!)
            const user = await User.findOne({ email:email});
            if(user && bcrypt.compareSync(password, user.password)){
              return user;
            }
            return null
          }
        })
      ],
      session:{
        strategy:"jwt"
      }
}
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }