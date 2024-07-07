const { cloudinary } = require("../config");
const fs = require("fs");
const path = require("path");

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

const uploadMultipleFiles = async (files) => {
  const uploadResults = [];

  for (const file of files) {
    const filePath = path.resolve(__dirname, "../../uploads/" + file.filename);
    const fileName = file.originalname;

    const result = await UploadToCloud(filePath, fileName);

    uploadResults.push(result);
  }

  return uploadResults;
};

const uploadSingleFile = async (file) => {
  const filePath = path.resolve(__dirname, "../../uploads/" + file.filename);
  const fileName = file.originalname;

  const result = await UploadToCloud(filePath, fileName);

  return result;
};

module.exports = {
  uploadMultipleFiles,
  uploadSingleFile,
};
