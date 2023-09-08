import bcrypt from "bcryptjs";

// salting and hashing method
export async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword; // overwriting  values
}

// login user comparing password
export const comparePassword = async (password, hashedPassword) => {
  const isMatch = await bcrypt.compare(password, hashedPassword); //hashedPassword is main function in controller js
  return isMatch;
};
