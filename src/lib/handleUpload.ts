import "server-only";
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getServerSession } from "next-auth";
import { authOptions } from "./authOptions";

interface AWSS3Credentials {
  accessKeyId: string;
  secretAccessKey: string;
}

const s3Client = new S3Client({
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY as string,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY as string,
  } as AWSS3Credentials,
});

async function isAdmin() {
  const session = await getServerSession(authOptions);
  return session?.user.role === "admin";
}

export async function imageUpload(image: File) {
  try {
    if (!(await isAdmin())) {
      return { url: "", success: false };
    }
    if (!image) {
      return { url: "", success: false };
    }
    const arrayBuffer = await image.arrayBuffer();
    const imageBuffer = new Uint8Array(arrayBuffer);
    let imageName = Date.now() + image.name;
    imageName = imageName.replace(/\s/g, "");
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: imageName,
      Body: imageBuffer,
      ContentType: "image/jpeg",
    });
    await s3Client.send(command);
    const imageUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${imageName}`;
    return { url: imageUrl, success: true };
  } catch (error) {
    console.log("Error in uploading image", error);
    return { url: "", success: false };
  }
}

export async function deleteImage(key: string) {
  try {
    if (!(await isAdmin())) {
      return { success: false, message: "Unauthorised" };
    }
    if (!key) {
      return { success: false, message: "Missing key" };
    }
    const command = new DeleteObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: key,
    });

    await s3Client.send(command);
    return { success: true, message: "Operation Completed" };
  } catch (error) {
    return { success: false, message: error.message };
  }
}
