import express, { Router } from 'express';
import multer from 'multer';
import checkAuth from '../middlewares/checkAuth.js';
import sharp from 'sharp';
import fs from 'fs';
import slugify from 'slugify';
import ServerUnexpectedError from '../errors/ServerUnexpectedError.js';
import path from 'path';

const multerRouter = Router();

multerRouter.use('/uploads', express.static('uploads'));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (!fs.existsSync('uploads')) {
            fs.mkdirSync('uploads');
        }
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, slugify(file.originalname));
    },
});

const upload = multer({ storage });

multerRouter.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    const filePath = req.file.path;
    const newFileName = slugify(path.basename(filePath, path.extname(filePath)));

    fs.readFile(filePath, (err, data) => {
        if (err) {
            return ServerUnexpectedError(res);
        };

        sharp(data)
            .webp()
            .toFile(`uploads/${newFileName}.webp`, (err, info) => {
                if (err) {
                    return ServerUnexpectedError(res);
                };

                return res.json({
                    url: `/uploads/${newFileName}.webp`
                });
            });
    });
});

export default multerRouter;