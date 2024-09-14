"use server";
import bcrypt from "bcrypt";
import { User } from "@/app/api/models/userModel";
import connectDB from "@/lib/connectDB";
import { z, ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

interface FormData {
  name: string;
  email: string;
  password: string;
}

interface RegisterResponse {
  success: boolean;
  message: string;
}

const registerSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Username is required." })
    .max(25, { message: "Username must be 25 characters or less." }),
  email: z
    .string()
    .min(4, { message: "Email must be at least 4 characters long." })
    .email({ message: "Enter a valid email address." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .max(20, { message: "Password must be 20 characters or less." }),
});

const validateRegisterData = (data: FormData): RegisterResponse | null => {
  try {
    registerSchema.parse(data);
    return { success: true, message: "Data Validated" };
  } catch (error) {
    if (error instanceof ZodError) {
      const validationError = fromZodError(error);
      const errorMessage = validationError.details[0].message;
      return { success: false, message: errorMessage };
    } else {
      return { success: false, message: "An unexpected error occurred." };
    }
  }
};

const registerUser = async (formData: FormData): Promise<RegisterResponse> => {
  try {
    const { name, email, password } = formData;

    const { success, message } = validateRegisterData({
      name,
      email,
      password,
    });
    if (!success) {
      return {
        success: false,
        message: message,
      };
    }

    await connectDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return { success: false, message: "User already exists." };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.create({
      name,
      email,
      password: hashedPassword,
    });
    return { success: true, message: "User registered successfully." };
  } catch (error) {
    console.error("Error registering user:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
};

export default registerUser;
