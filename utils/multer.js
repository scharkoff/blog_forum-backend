// -- App
import { app } from "../index.js";

// -- Плагины
import express from "express";
import multer from "multer";

// -- Посредники
import checkAuth from "./checkAuth.js";

export const multerUploads = () => {
  // -- Доступ к картинке
  app.use("/uploads", express.static("uploads")); // -- GET запрос на получение статичного файла по его названию (с расширением)

  // -- Multer storage
  const storage = multer.diskStorage({
    destination: (__, _, cb) => {
      if (fs.existsSync("uploads")) {
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
  app.post(
    "/upload",
    function (req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      next();
    },
    checkAuth,
    upload.single("image"),
    (req, res) => {
      return res.json({
        url: `/uploads/${req.file.originalname}`,
      });
    }
  );
};
