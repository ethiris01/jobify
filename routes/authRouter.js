import { Router } from "express";
const router = Router();
import { login, logout, register } from "../controllers/authController.js";
import {
  validateLoginInput,
  validateRegisterInput,
} from "../middleware/validationMiddleware.js";

// express-rate-limit is an Express.js middleware that helps control and limit the rate of incoming requests from a specific IP address
import rateLimiter from "express-rate-limit";

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 15,
  message: { msg: "IP rate limit exceeded, retry in 15 minutes." },
});

router.post("/register", apiLimiter, validateRegisterInput, register);
router.post("/login", apiLimiter, validateLoginInput, login);
router.get("/logout", logout);

export default router;

// userModel and  authRouter - child
// authController - is main parent element
