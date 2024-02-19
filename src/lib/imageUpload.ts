import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export async function imageUpload(image:File) {
  interface AWSS3Credentials {
    accessKeyId: string;
    secretAccessKey: string;
  }
  try {
    const arrayBuffer = await image.arrayBuffer();
    const imageBuffer = new Uint8Array(arrayBuffer);
    const imageName = Date.now() + image.name;
    const s3Client = new S3Client({
      region: process.env.AWS_S3_REGION,
      credentials: {
        accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY as string,
      } as AWSS3Credentials,
    });
    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: imageName,
      Body: imageBuffer,
      ContentType: "image/jpeg",
    };
    const command = new PutObjectCommand(params);
    const upload = await s3Client.send(command);
    const imageUrl = `https://foody-website.s3.ap-south-1.amazonaws.com/${imageName}`;
    return imageUrl;
  } catch (error) {
    console.log("Error in uploading image",error);
    return error
  }
}
