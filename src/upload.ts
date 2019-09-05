import multer from "multer";
import { Storage } from "@google-cloud/storage";
import path from "path";

const gc = new Storage({
  keyFilename: path.join(__dirname, "../__.json"),
  projectId: ""
});

const bucket = gc.bucket("__storage");

// const upload = multer({ dest: "uploads/" });
const upload = multer({
  // storage: multer.MemoryStorage,
  limits: {
    fileSize: 5 * 1024 * 1024 // no larger than 5mb
  }
});

export const uploadMiddleware = upload.single("file");

export const uploadController = async (req, res) => {
  console.log("req.file", req.file);
  const fileUpload = await bucket.file(req.file.originalname);
  const uploadStream = await fileUpload.createWriteStream({
    metadata: {
      contentType: req.file.mimetype
    }
  });

  uploadStream.on("error", err => {
    console.log("error", err);
  });

  uploadStream.on("finish", () => {
    // The public URL can be used to access the file via HTTP.
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`;

    // Make the image public to the web
    fileUpload
      .makePublic()
      .then(() => {
        res.status(200).send(publicUrl);
      })
      .catch(err => {
        console.log("err", err);
      });
  });
  uploadStream.end(req.file.buffer);
};
