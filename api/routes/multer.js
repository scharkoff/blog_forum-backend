import express, { Router } from "express";
import multer from "multer";
import fs from "fs";

// -- Посредники
import checkAuth from "../middlewares/checkAuth.js";

export const multerRouter = Router();

multerRouter.use("/uploads", express.static("uploads"));

// -- Multer storage
const storage = multer.diskStorage({
  destination: (__, _, cb) => {
    if (!fs.existsSync("uploads")) {
      fs.mkdirSync("uploads");
    }
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// -- Загрузить файл картинку
multerRouter.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  return res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

