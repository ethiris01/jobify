// were the userController routes are follow up!
import { Router } from "express";
import {
  getApplicationStats,
  getCurrentUser,
  UpdateUser,
} from "../controllers/userController.js";
import { validateUpdateUserInput } from "../middleware/validationMiddleware.js";
import {
  authorizedPermissions,
  checkForTestUser,
} from "../middleware/authMiddleware.js";
// middleware for multer package for uploading the image and form data
import upload from "../middleware/multerMiddleware.js";
const router = Router();

// visible for only admin
router.get("/current-user", getCurrentUser);
router.get("/admin/app-stats", [
  authorizedPermissions("admin"), // setup the authorized permissions for only admin can access
  getApplicationStats,
]); // it should be visible for only admin user

router.patch(
  "/update-user",
  upload.single("avatar"),
  checkForTestUser,
  validateUpdateUserInput,
  UpdateUser
);
//    validation should be added above
export default router;
