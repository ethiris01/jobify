import { readFile } from "fs/promises";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// Job and User Model
import Job from "./models/jobModel.js";
import User from "./models/userModel.js";

try {
  await mongoose.connect(process.env.MONGO_URL); // connect to mongoDB
  const user = await User.findOne({ email: "test@test.com" }); demo user finding id
  
  const jsonJobs = JSON.parse(
    // await readFile(new URL("./utils/mockData.json", import.meta.url)) /mockData.json for demo users with 100 jobs
    await readFile(new URL("./utils/mockData.json", import.meta.url)) // mockData for admin
  );
  // mapping the jobs and return it as job array with userID
  const jobs = jsonJobs.map((job) => {
    return { ...job, createdBy: user._id };
  });
  // delete all jobs in job collection created by user.
  await Job.deleteMany({ createdBy: user._id });
  // create new job in job collection using jobs array
  await Job.create(jobs);
  console.log("Success");
  process.exit(0);
} catch (error) {
  console.log(error);
  process.exit(1);
}
