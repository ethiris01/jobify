//default middleware for error handlers.

import { StatusCodes } from "http-status-codes";

export const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR; // declared the status codes
  const msg = err.message || "Something went wrong!, Check it inside in files.";
  res.status(statusCode).json({ msg }); // called or used here.
};

export default errorHandlerMiddleware;
