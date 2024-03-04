"use server";
import bcrypt from "bcrypt";
import { User } from "@/app/api/models/userModel";
import connectDB from "@/lib/connectDB";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";

const registerUser = async (formData: FormData) => {
  try {
    const registerSchema = z.object({
      name: z.string().min(1, { message: "Enter a valid username" }).max(25),
      email: z
        .string()
        .min(4, { message: "Enter a valid email." })
        .email("This is not a valid email."),
      password: z
        .string()
        .min(8, { message: "Password must be 8 or more characters long" })
        .max(20),
    });
    const { name, email, password } = Object.fromEntries(formData);
    try {
      registerSchema.parse({ name, email, password });
    } catch (error) {
      const validationError = fromZodError(error);
      const error_message = validationError.details[0].message;
      return { success: false, message: error_message };
    }

    await connectDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return { success: false, message: "User Exists" };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return { success: true, message: "User registered successfully" };
  } catch (error) {
    console.error("Error registering user:", error.message);
    return {
      success: false,
      message: "Something Went Wrong. Try again again after some time",
    };
  }
};

export default registerUser;
