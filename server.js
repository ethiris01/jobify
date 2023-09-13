import "express-async-errors";
import * as dotenv from "dotenv";
dotenv.config();
import express from "express"; // this server.js is like mama
const app = express();
import morgan from "morgan";
import mongoose from "mongoose"; // Connect DB
import cookieParser from "cookie-parser"; // cookie parser is used to convert the cookie
import cloudinary from "cloudinary"; // cloudinary for storing images.

//testing with validators
// import { validateTest } from "./middleware/validationMiddleware.js";
// routers
import jobRouter from "./routes/jobRouter.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
// public
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

// middleware
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import { authenticateUser } from "./middleware/authMiddleware.js";

// cloud nary access
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// public with uploads for avatar images.
const __dirname = dirname(fileURLToPath(import.meta.url));
// // morgan
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
// // public folder dirname used.
app.use(express.static(path.resolve(__dirname, "./client/dist")));

// cookie parser used.
app.use(cookieParser());
// express used.
app.use(express.json());

// get method is used to get the request from the user and communicate with server
app.get("/", (req, res) => {
  res.send("Hello World");
});
// This a home route.
//  post method is used for response from the web.
app.post("/", (req, res) => {
  console.log(req);
  res.json({ message: "data received", data: req.body });
});

// Testing the route fpr validate the users.
// app.post("/api/v1/test", validateTest, (req, res) => {
//   const { name } = req.body;
//   res.json({ message: `hello ${name}` });
// });

// testing proxy setup
app.get("/api/v1/test", (req, res) => {
  res.json({ msg: "test route" });
});

// code refractured and used in jobController and jobRouter
app.use("/api/v1/jobs", authenticateUser, jobRouter); // all jobs route
app.use("/api/v1/users", authenticateUser, userRouter); // user stats route
app.use("/api/v1/auth", authRouter); // authenticate user route

// entry point for front-end
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/dist", "index.html"));
});
// not found Error -  it will take care of url ex:jobs -> joab
app.use("*", (req, res) => {
  res.status(404).json({ msg: "Not found, Check the url route." });
});
// error route -  it will show up the error we made inside of this file.
// ex : unwanted console.log and throw errors
app.use(errorHandlerMiddleware);
//port were server is running
const port = process.env.PORT || 5100;

// connection function for mongoose with mongodb
try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    //  listen method use for refer the server is hosted on which port!
    console.log(`Server running on PORT ${port}... (back-end)`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
