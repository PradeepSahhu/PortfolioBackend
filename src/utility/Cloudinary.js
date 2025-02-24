import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "pradeepsahhu",
  api_key: "398975623593251",
  api_secret: "nhyFxRmgj8PFGCRgIhh2Ubs4YiM",
});

const uploadCloudinary = async function (fileUploadStream) {
  if (!fileUploadStream) {
    return null;
  }

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: "auto" }, // Adjust based on file type
      (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      }
    );

    uploadStream.end(fileUploadStream);
  });
};

export { uploadCloudinary };
