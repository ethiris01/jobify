import Job from "../models/jobModel.js";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import day from "dayjs";
// import { NotFoundError } from "../errors/customError.js";
// restructuring the data for mongodb

export const getAllJobs = async (req, res) => {
  console.log(req.user); // admin or user role.
  // query params functionality
  const { search, jobStatus, jobType, sort } = req.query; // query lot hold the values.

  const queryObject = {
    createdBy: req.user.userId, // the id stored as queryObject passed in parameter below
  };
  if (search) {
    queryObject.$or = [
      // this function is coming from mongoDB
      {
        position: { $regex: search, $options: "i" }, // search = query and options = ex: if you type a position with value a will be listed
      },
      {
        company: { $regex: search, $options: "i" },
      },
    ];
  }
  // job status  if jobStatus and jobStatus not equal to all,  it will be display all , otherwise it will display the declined jobs.
  if (jobStatus && jobStatus !== "all") {
    queryObject.jobStatus = jobStatus;
  }
  // job type  if jobType and jobType not equal to all,  it will be display all , otherwise it will display the part-time jobs
  if (jobType && jobType !== "all") {
    queryObject.jobType = jobType;
  }

  //sorting the values for position ex: developer.
  const sortOptions = {
    newest: "-createdAt",
    oldest: "createAt",
    "a-z": "position",
    "z-a": "-position",
  };
  // query params
  const sortKey = sortOptions[sort] || sortOptions.newest;

  // setup pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit; // ex: (1-1)*10 = 0 ,ex: (2-1)*10 = 10

  // created by admin or user if id match it will work.
  const jobs = await Job.find(queryObject)
    .sort(sortKey)
    .skip(skip)
    .limit(limit); // Sort function passing the sortKey
  // total jobs found.
  const totalJobs = await Job.countDocuments(queryObject);

  const numOfPages = Math.ceil(totalJobs / limit);
  res
    .status(StatusCodes.OK)
    .json({ totalJobs, numOfPages, currentPage: page, jobs });
};

// this code refactored for params functionality
//   const jobs = await Job.find({
//     createdBy: req.user.userId,
//   }); // created by admin or user if id match it will work
//   res.status(StatusCodes.OK).json({ jobs });
// };

// code restructured for mongodb collections u can use try and catch method but it not hard to control all data
export const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId; // created by admin = created by  his userId as same as user also
  // const { company, position } = req.body; // you can write inside of job.create as (req.body) and clear this line
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};
// code restructured for mongodb collections with findById
export const getJob = async (req, res) => {
  // const { id } = req.params;
  const job = await Job.findById(req.params.id);

  // if (!job) throw new NotFoundError(`no job with id ${id}`); this should be removed because of we refactored it.
  // custom error for not found used and code refactored
  // { return res.status(404).json({ msg: `no job with id ${id}` }); } old code.
  res.status(StatusCodes.OK).json({ job });
};

// code restructured for mongodb collections with
export const updateJob = async (req, res) => {
  // const { id } = req.params;
  const updateJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  // if (!updateJob) throw new NotFoundError(`no job with id ${id}`); this should be removed because of we refactored it.

  res.status(StatusCodes.OK).json({ msg: "job modified", job: updateJob });
};
// code restructured for mongodb collections with findByIdAndDelete

export const deleteJob = async (req, res) => {
  // const { id } = req.params;
  const removeJob = await Job.findByIdAndDelete(req.params.id);

  // if (!removeJob) throw new NotFoundError(`no job with id ${id}`); this should be removed because of we refactored it.

  res.status(StatusCodes.OK).json({ msg: "Job deleted", job: removeJob });
};

// show stats  ex: 'pending' count:'12'
export const showStats = async (req, res) => {
  // mongodb pipeline functionality ref docs or readme
  let stats = await Job.aggregate([
    // this function get all jobs from user with match id
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } }, // this get user job if ethiris or zippy.
    { $group: { _id: "$jobStatus", count: { $sum: 1 } } }, // it is used to group and collections of jobs.
  ]);
  // console.log(stats); [ { _id: 'pending', count: 12 },{ _id: 'declined', count: 17 },{ _id: 'interview', count: 21 }]

  // reduce function is callback function with 2 arguments - acc, curr
  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr; // title and count as current value.
    acc[title] = count; // updated acc returned at end of iteration  ex: interview ,21
    return acc; // after all iterations final acc onj assign to stats.
  }, {});
  // console.log(stats);  { interview: 21, declined: 17, pending: 12 }

  // default stats functionality.
  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  };

  // Group by the monthly applications functionality.

  let monthlyApplications = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } }, // id to match
    {
      $group: {
        //  ex: {"_id": {"year": 2023,"month": 5},"count": 3},
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    // sorting the order with id year and month on descending order.
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    // limit the  6 months to show data from stats
    { $limit: 6 },
  ]);

  // mapping the monthly applications into array
  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month }, // 2023 , aug
        count, // 14
      } = item;
      // used day.js
      const date = day()
        .month(month - 1) // it actually 1 as jan.
        .year(year)
        .format("MMM YY");

      return { date, count };
    })
    .reverse();

  // after that this all the code be listed as this .
  // let monthlyApplications = [
  //   {
  //     date: "May 23",   // used day.js and exported the date
  //     count: 12,   // reduce func acc ,curr  to assign the value
  //   },
  //   {
  //     date: "Jun 23",
  //     count: 6,
  //   },
  //   {
  //     date: "July 23",
  //     count: 3,
  //   },
  // ];

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};

// custom error created and used as component here. the logic is setup in custom error.js
//  throw new NotFoundError(`no job with id ${id}`);
