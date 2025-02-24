import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: "pradeepsahhu",
  api_key: "398975623593251",
  api_secret: "nhyFxRmgj8PFGCRgIhh2Ubs4YiM",
});

const uploadCloudinary = async function (localFilePah) {
  if (!localFilePah) {
    return null;
  }

  try {
    const uploadResult = await cloudinary.uploader.upload(localFilePah, {
      resource_type: "auto",
    });

    console.log(autoCropUrl);
  } catch (error) {}
};

export { uploadCloudinary };
