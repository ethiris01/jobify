import jwt from "jsonwebtoken";
import { token } from "morgan";

export const createJwt = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};

// verify JWT and restrict the users with token element
export const verifyJWT = (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded;
};

//A JSON Web Token (JWT) is a compact and secure way of transmitting data between parties.
// we setup the jwt for user id security and created a token variable
