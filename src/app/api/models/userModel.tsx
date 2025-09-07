import mongoose, { InferSchemaType, Model } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    role: {
      type: String,
      default: "user",
    },
    emailVerified: {},
  },
  { timestamps: true }
);

type UserType = InferSchemaType<typeof userSchema>;

const User: Model<UserType> =
  mongoose.models.User || mongoose.model("User", userSchema);
export default User;
