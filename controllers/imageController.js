const { cloudinary } = require("../config");
const asyncHandler = require("express-async-handler");
// receive image from the client and save it to cloudinary
const options = {
  folder: "iphone_store",
  invalidate: true,
  resource_type: "image",
  overwrite: true,
};
const uploadImage = asyncHandler(async (req, res) => {
  // Get the image file from the
  console.log("request", req.body);
  const file = req.body.image;
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(file, options, (error, result) => {
      if (result && result.secure_url) {
        console.log(result.secure_url);
        res.status(201).json({
          message: "Image uploaded successfully",
          url: result.secure_url,
        });
        return resolve(result.secure_url);
      }
      console.log(error.message);
      return reject({ message: error.message });
    });
  });
});

module.exports = { uploadImage };
