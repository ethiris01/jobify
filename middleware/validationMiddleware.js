//validate the users and testing purpose this module is used!
// it is truly validation setup to handle the upcoming errors.
import { body, param, validationResult } from "express-validator";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../errors/customError.js";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants.js";
import mongoose from "mongoose";
import Job from "../models/jobModel.js";
import isEmail from "validator/lib/isEmail.js";
import User from "../models/userModel.js";
// main object for validationErrors.
const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg); // error array declared here
        if (errorMessages[0].startsWith("no job")) {
          // error message for no jobs
          throw new NotFoundError(errorMessages);
        }
        if (errorMessages[0].startsWith("not authorized"))
          throw new UnauthorizedError("not authorized to access this route");

        throw new BadRequestError(errorMessages); // called here as error messages.
      }
      next();
    },
  ];
};
// validate job input
export const validateJobInput = withValidationErrors([
  body("company").notEmpty().withMessage("company is required"),
  body("position").notEmpty().withMessage("position is required"),
  body("jobLocation").notEmpty().withMessage("job Location is required"),
  body("jobStatus")
    .isIn(Object.values(JOB_STATUS)) // isIn method used because of enum method we used in the jobModel.js
    .withMessage("invalid status value"),
  body("jobType")
    .isIn(Object.values(JOB_TYPE))
    .withMessage("invalid type value"),
]);

// validate id params
export const validateIdParam = withValidationErrors([
  param("id").custom(async (value, { req }) => {
    const isValidMongoId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidMongoId) throw new BadRequestError("invalid MongoDB id");
    const job = await Job.findById(value);
    if (!job) throw new NotFoundError(`no job with id ${value}`);
    // validate owner with role. if userId createdBy is same he is a admin and owner if not he is a user
    const isAdmin = req.user.role === "admin";
    const isOwner = req.user.userId === job.createdBy.toString();
    if (!isAdmin && !isOwner)
      throw new UnauthorizedError("not authorized to access this route");
  }),
]);

// validate the register user
export const validateRegisterInput = withValidationErrors([
  body("name").notEmpty().withMessage("name is required"),
  body("email") // validation for email
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format")
    .custom(async (email) => {
      // method to validate the email and conditions to check the user exists or not
      const user = await User.findOne({ email });
      if (user) {
        throw new Error("email already exists");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("password is required") //
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 characters "),
  body("lastName").notEmpty().withMessage("last name is required"),
  body("location").notEmpty().withMessage("location is required"),
]);

// validate login user
export const validateLoginInput = withValidationErrors([
  body("email") // validation for email
    .notEmpty()
    .withMessage("email is required"),
  body("password").notEmpty().withMessage("password is required"), //
]);

// validate for update user
export const validateUpdateUserInput = withValidationErrors([
  body("name").notEmpty().withMessage("name is required"),
  body("email") // validation for email
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format")
    .custom(async (email, { req }) => {
      // for unique update option req should passed in parameter
      const user = await User.findOne({ email });
      // method to validate the update user and check the condition below
      if (user && user._id.toString() !== req.user.userId) {
        // to find email exits or not and find the user email are unique ex: john bcz they can create same mail id
        throw new BadRequestError("email already exists");
      }
    }),
  body("lastName").notEmpty().withMessage("last name is required"),
  body("location").notEmpty().withMessage("location is required"),
]);

// this is used for testing purpose and name property is used here.
// export const validateTest = withValidationErrors([
//   body("name")
//     .notEmpty()
//     .withMessage("name is required")
//     .isLength({ min: 3, max: 50 })
//     .withMessage("name must be between 3 and 50 characters long")
//     .trim(), // whiteSpaces super library
// ]);
