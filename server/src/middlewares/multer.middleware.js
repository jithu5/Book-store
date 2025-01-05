import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/temp");
    },
    filename: function (req, file, cb) {
        const uniqueName = `${file.fieldname}-${Date.now()}-${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    }
});

export const upload = multer({ 
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});