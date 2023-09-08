import { Router } from "express";
const router = Router();

import {
  getAllJobs,
  createJob,
  getJob,
  updateJob,
  deleteJob,
  showStats,
} from "../controllers/jobController.js";

import {
  validateJobInput,
  validateIdParam,
} from "../middleware/validationMiddleware.js";
// test user middleware DEMO USER!!
import { checkForTestUser } from "../middleware/authMiddleware.js";
// router.get("/", getAllJobs);
// router.get('/', createJob);
// This is simply rearranged below easily for less lines of code

// validateJobInput is added to function the create and update job has this component
router
  .route("/")
  .get(getAllJobs)
  .post(checkForTestUser, validateJobInput, createJob); //sTEST CANT ACCESS THIS ROUTE

// we should place before id because express thinks stats is a id

router.route("/stats").get(showStats);

router
  .route("/:id")
  .get(validateIdParam, getJob)
  .patch(checkForTestUser, validateJobInput, validateIdParam, updateJob) // TEST USER CANT ACCESS THIS ROUTE
  .delete(checkForTestUser, validateIdParam, deleteJob); // TEST USER CANT ACCESS THIS ROUTE

export default router;
