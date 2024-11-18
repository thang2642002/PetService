import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

// Cấu hình Cloudinary
cloudinary.config({
  cloud_name: "dktvrhmka",
  api_key: "742228376334399",
  api_secret: "s6GOxo2VSM4909B7erHCgDKI1xQ",
});

// Cấu hình lưu trữ trên Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads_image", // Tên folder trong Cloudinary
    format: async (req, file) => file.mimetype.split("/")[1], // Định dạng file gốc
  },
});

const upload = multer({ storage });

export { cloudinary, upload };
