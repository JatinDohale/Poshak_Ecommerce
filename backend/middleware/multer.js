// middleware/multer.js
import multer from "multer";

const storage = multer.memoryStorage(); // ✅ required for file.buffer

const upload = multer({ storage });

export default upload;