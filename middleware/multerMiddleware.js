import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // set the directory where uploaded files will be stored
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname;
    // set the name of the uploaded file
    cb(null, fileName);
  },
});
const upload = multer({ storage });

export default upload;

// import multer from "multer"; // package imported

// const storage = multer.diskStorage({
//   // setup the local storage destination
//   destination: (req, file, cb) => {
//     cb(null, "public/uploads");
//   },
//   filename: (req, file, cb) => {
//     // setup the local storage file name
//     const fileName = file.originalname;
//     cb(null, fileName);
//   },
// });

// const upload = multer({ storage }); // invoke the storage inside this package.

// export default upload;
