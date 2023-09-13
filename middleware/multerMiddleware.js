import multer from "multer";
// import the datauri package.
import DataParser from "datauri/parser.js";
import path from "path";

// update user-fix
const storage = multer.memoryStorage();

const upload = multer({ storage });

const parser = new DataParser();
export const formatImage = (file) => {
  const fileExtension = path.extname(file.originalname).toString();
  return parser.format(fileExtension, file.buffer).content;
};
export default upload;

// for public folder options only
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     // set the directory where uploaded files will be stored
//     cb(null, "public/uploads");
//   },
//   filename: (req, file, cb) => {
//     const fileName = file.originalname;
//     // set the name of the uploaded file
//     cb(null, fileName);
//   },
// });
