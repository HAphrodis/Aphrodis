/* eslint-disable @typescript-eslint/no-explicit-any */
import cloudinary from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRECT,
  secure: true,
});

export async function POST(req: NextRequest) {
  const data = await req.formData();

  if (data.get("file")) {
    const file = data.get("file") as File;
    const fileBuffer = await file.arrayBuffer();

    const mime = file.type;
    const encoding = "base64";
    const base64Data = Buffer.from(fileBuffer).toString("base64");
    const fileUri = "data:" + mime + ";" + encoding + "," + base64Data;

    try {
      const uploadToCloudinary = () => {
        return new Promise((resolve, reject) => {
          cloudinary.v2.uploader
            .upload(fileUri, {
              invalidate: true,
            })
            .then((result) => {
              // console.log(result);
              resolve(result);
            })
            .catch((error) => {
              // console.log(error);
              reject(error);
            });
        });
      };
      const uploadResult: any = await uploadToCloudinary();
      return NextResponse.json(uploadResult.secure_url);
    } catch (error) {
      console.error("server err", error);
      return NextResponse.json(
        { err: "Internal Server Error" },
        { status: 500 },
      );
    }
  }
}
