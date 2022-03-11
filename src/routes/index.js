const {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
} = require("../config");
const Photo = require("../models/Photo");
const cloudinary = require("cloudinary");
const fs = require("fs-extra");
const { Router } = require("express");
const router = Router();

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

router.get("/", async (req, res) => {
  const photos = await Photo.find();
  res.render("images", { photos });
});

router.get("/images/add", async (req, res) => {
  const photos = await Photo.find();
  console.log(photos);
  res.render("image_form", { photos });
});

router.post("/images/add", async (req, res) => {
  const { title, description } = req.body;
  const { public_id, secure_url } = await cloudinary.v2.uploader.upload(
    req.file.path
  );
  const newPhoto = new Photo({
    title,
    description,
    imageURL: secure_url,
    public_id,
  });
  await newPhoto.save();
  await fs.unlink(req.file.path);
  res.redirect("/");
});

router.get("/images/delete/:photo_id", async (req, res) => {
  const { photo_id } = req.params;
  const photo = await Photo.findByIdAndDelete(photo_id);
  const result = await cloudinary.v2.uploader.destroy(photo.public_id);
  console.log(result);
  res.redirect("/images/add");
});

module.exports = router;
