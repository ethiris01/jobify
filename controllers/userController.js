// user routes ex: get current user, application stats, update user.
import { StatusCodes } from "http-status-codes";
import User from "../models/userModel.js";
import Job from "../models/jobModel.js";
import cloudinary from "cloudinary";
import { promises as fs } from "fs";
// get currentUser
export const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId }); // user were the all scheme invoked
  const userWithoutPassword = user.toJSON(); // user without password method - toJSON()
  res.status(StatusCodes.OK).json({ user: userWithoutPassword });
};
// get application stats
export const getApplicationStats = async (req, res) => {
  const users = await User.countDocuments(); // users stored here
  const jobs = await Job.countDocuments(); // jobs stored here
  res.status(StatusCodes.OK).json({ users, jobs });
};
// get update user
export const UpdateUser = async (req, res) => {
  // password update functionality
  const newUser = { ...req.body };
  delete newUser.password;
  // functionality for cloudinary

  if (req.file) {
    // if exists, newUser is a req from the user
    const response = await cloudinary.v2.uploader.upload(req.file.path); // the response will be uploaded
    await fs.unlink(req.file.path); // after that the it will unlink from cloud for storage
    newUser.avatar = response.secure_url; // it used to secure the url
    newUser.avatarPublicId = response.public_id; // avatarId is public
  }
  //   console.log(obj);
  const updatedUser = await User.findByIdAndUpdate(req.user.userId, newUser); //update user functionality using userId

  // condition for if file exits and avatarPublicId is true that function will destroy from cloud
  if (req.file && updatedUser.avatarPublicId) {
    await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId); // it will destroy the public id
  }
  res.status(StatusCodes.OK).json({ msg: "User updated" });
};

// first create a controller and setup the router after that add them in server.js
