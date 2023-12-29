import mongoose from "mongoose";
import { User } from "../models/userModel";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function PUT(req: Request) {
    interface Session {
        user: {
          name: string|undefined
          email: string|undefined
          image: string
        }
      }
      const session = await getServerSession(authOptions)
  const body = await req.json();
  console.log(body);
  mongoose.connect(process.env.MONGODB_URI!);
  const email = session?.user?.email;
  console.log('server session',session);
  //console.log('session server',req);
  /* const res = await User.updateOne({email},{name:body.username})
  console.log(res); */
  return Response.json("ok");
}
