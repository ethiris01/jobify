// it's  a scheme for mongodb database
import mongoose from "mongoose";
// constants for jobStatus
import { JOB_STATUS, JOB_TYPE } from "../utils/constants.js";
const JobSchema = new mongoose.Schema(
  {
    company: String,
    position: String,
    // we are using enum because of these are selecting from the box
    jobStatus: {
      type: String,
      enum: Object.values(JOB_STATUS), // first it setups as array later declared as constants
      default: JOB_STATUS.PENDING,
    },
    jobType: {
      type: String,
      enum: Object.values(JOB_TYPE), // first it setups as array later declared as constants
      default: JOB_TYPE.FULL_TIME,
    },
    jobLocation: {
      type: String,
      default: "my city",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      default: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Job", JobSchema);
