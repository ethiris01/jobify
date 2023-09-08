// this middleware is used to authenticate the user with cookies and get all jobs route
import {
  UnauthenticatedError,
  UnauthorizedError,
  BadRequestError,
} from "../errors/customError.js";
import { verifyJWT } from "../utils/tokenUtils..js";

// authentication middleware for job routes
export const authenticateUser = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) throw new UnauthenticatedError("Authentication invalid");

  // verifying JWT  and restrict the users with token element
  // if the user is present it move if not it will show error

  try {
    const { userId, role } = verifyJWT(token);
    const testUser = userId === "64f8505482774d0159ba7f5c"; // test userId
    req.user = { userId, role, testUser }; // passed over here.
    next();
  } catch (error) {
    throw new UnauthenticatedError("authentication invalid");
  }
};

// authorized permissions to access the role and give permission to access
export const authorizedPermissions = (...roles) => {
  // accessing the roles like admin or user.
  return (req, res, next) => {
    // console.log(roles);
    if (!roles.includes(req.user.role)) {
      // if role is not equal to admin this error will show
      throw new UnauthorizedError("Unauthorized to access this route");
    }
    next(); // if it is admin it will trigger to next step
  };
};

// test user functionality
export const checkForTestUser = (req, res, next) => {
  if (req.user.testUser) {
    throw new BadRequestError("Demo User. Read Only");
  }
  next();
};

// you can call up this function in job router on get all jobs route.
// but call up in server.js way more clean.
// step 1 import this function server and called up after the job router

// steps to do , if cookies not exits the authenticate will invalid
// step 1 register the user and login user after that user can access the jobs router.
// if user doesn't created it will became invalid.
