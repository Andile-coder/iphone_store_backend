const { cloudinary } = require("../config");
const asyncHandler = require("express-async-handler");
const { get } = require("../routes/cloudinaryRoutes");

const options = {
  folder: "iphone_store",
  invalidate: true,
  resource_type: "image",
  overwrite: true,
};

const uploadImage = asyncHandler(async (req, res) => {
  try {
    const file = req.body.image;
    const user = req.body.user;

    // Ensure file and user are provided
    if (!file || !user) {
      return res
        .status(400)
        .json({ message: "Image file and user information are required" });
    }

    const result = await cloudinary.uploader.upload(file, {
      ...options,
      tags: user,
    });

    if (result && result.secure_url) {
      return res.status(201).json({
        message: "Image uploaded successfully",
        url: result.secure_url,
      });
    } else {
      throw new Error("Image upload failed");
    }
  } catch (error) {
    console.error("Error uploading image server side:", error.message);
    return res.status(500).json({ message: error.message });
  }
});

const getProfilePicture = asyncHandler(async (req, res) => {
  try {
    const user_id = req.params.id;

    // Ensure user is provided
    if (!user_id) {
      return res.status(400).json({ message: "User information is required" });
    }

    const result = await cloudinary.search
      .expression(`tags=${user_id}`)
      .execute();

    if (result && result.resources) {
      return res.status(200).json({
        message: "Images retrieved successfully",
        images: result.resources,
      });
    } else {
      throw new Error("Image retrieval failed");
    }
  } catch (error) {
    console.error("Error retrieving images server side:", error.message);
    return res.status(500).json({ message: error.message });
  }
});

const getImage = asyncHandler(async (req, res) => {
  try {
    console.log("body");
    const image_id = req.body;
    console.log("body", image_id);
    if (!image_id) {
      return res.status(400).json({ message: "Image id is required" });
    }
    const result = await cloudinary.search
      .expression(`tags=${image_id}`)
      .execute();
    if (result && result.resources) {
      return res.status(200).json({
        message: "Image retrieved successfully",
        image: result.resources,
      });
    } else {
      throw new Error("Image retrieval failed");
    }
  } catch (error) {
    console.error("Error retrieving image server side:", error.message);
    return res.status(500).json({ message: error.message });
  }
});

// get all images

const getImages = asyncHandler(async (req, res) => {
  try {
    const result = await cloudinary.search
      .expression("folder=iphone_store")
      .execute();
    if (result && result.resources) {
      return res.status(200).json({
        message: "Images retrieved successfully",
        images: result.resources,
      });
    } else {
      throw new Error("Image retrieval failed");
    }
  } catch (error) {
    console.error("Error retrieving images server side:", error.message);
    return res.status(500).json({ message: error.message });
  }
});

module.exports = { uploadImage, getProfilePicture, getImage, getImages };
