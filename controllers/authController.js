// functionality of user model and authRouter
import { StatusCodes } from "http-status-codes";
import User from "../models/userModel.js";
import { comparePassword, hashPassword } from "../utils/passwordUtils.js";
import { UnauthenticatedError } from "../errors/customError.js";
import { createJwt } from "../utils/tokenUtils..js";
import { token } from "morgan";

// register page functionality
export const register = async (req, res) => {
  // admin user functionality - the first user gets a role as admin , other than all are users.
  const isFirstAccount = (await User.countDocuments()) === 0; // first account should be a admin
  req.body.role = isFirstAccount ? "admin" : "user";

  // hash  and salting passwords functionality. imported from utils - passwordUtils
  const hashedPassword = await hashPassword(req.body.password); //hashing values
  req.body.password = hashedPassword; // and return it here.

  // creating users
  const user = await User.create(req.body); // user create function through the body
  res.status(StatusCodes.CREATED).json({ msg: "User created" }); // user created for mongodb.
};

// login page functionality. normal method and logic
// export const login = async (req, res) => {
//   const user = await User.findOne({ email: req.body.email });
//   if (!user) throw new UnauthenticatedError("invalid email");
//   const isPasswordCorrect = await comparePassword(
//     req.body.password,
//     user.password
//   );
//   if (!isPasswordCorrect) throw new UnauthenticatedError("invalid password");
//   res.status(StatusCodes.CREATED).json({ msg: "logged in" });
// };

// easy method
export const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  const isValidUser =
    user && (await comparePassword(req.body.password, user.password));
  if (!isValidUser) throw new UnauthenticatedError("invalid credentials");
  // jwt token functionality
  const token = createJwt({
    userId: user._id,
    role: user.role,
  });
  const oneDay = 1000 * 60 * 60 * 24; // 1000 milliseconds x 60 seconds X 60 minutes X 24 hours = 1 day
  // setup own HTTP cookie for communication with frontend to backend
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
  });
  res.status(StatusCodes.OK).json({ msg: "User logged in." });
};

// Logout controller
export const logout = (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};

// createJwt({payload:string})  syntax of jwt setup in authController

// jwtToken is used for storing the data in string giant object for security purpose. ex: user id and role
