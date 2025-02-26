import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "pradeepsahhu",
  api_key: "398975623593251",
  api_secret: "nhyFxRmgj8PFGCRgIhh2Ubs4YiM",
});

const deleteResources = async (image_url) => {
  try {
    const urls = Array.isArray(image_url) ? image_url : [image_url];

    const public_ids = urls
      .map((url) => {
        const match = url.match(/\/upload\/v\d+\/(.+?)\./);
        return match ? match[1] : null;
      })
      .filter(Boolean);

    // console.log(public_ids);
    const res = await cloudinary.api.delete_resources(public_ids);

    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

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
        // console.log(result);
        resolve(result);
      }
    );

    uploadStream.end(fileUploadStream);

    // console.log("The Imae url is : ************* ");
    // console.log(uploadStream);
  });
};

export { uploadCloudinary, deleteResources };
