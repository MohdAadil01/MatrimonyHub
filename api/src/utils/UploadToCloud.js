const { cloudinary } = require("../config");
const fs = require("fs");

const UploadToCloud = async (filePath, fileName) => {
  try {
    const uploadResult = await cloudinary.uploader.upload(filePath, {
      public_id: `${fileName}-${Date.now()}`,
      folder: "matrimonyHub",
      resource_type: "auto",
      filename_override: `${fileName}`,
    });

    fs.unlinkSync(filePath);

    return {
      public_id: uploadResult.public_id,
      url: uploadResult.url,
      secure_url: uploadResult.secure_url,
      format: uploadResult.format,
    };
  } catch (error) {
    throw new Error("Error while uploading file to cloud. " + error);
  }
};

module.exports = UploadToCloud;
