import Job from "./Job";
import Wrapper from "../assets/wrappers/JobsContainer";
import { useAllJobsContext } from "../pages/AllJobs";
import PageBtnContainer from "./PageBtnContainer";
const JobsContainer = () => {
  const { data } = useAllJobsContext();
  // console.log(data);

  const { jobs, totalJobs, numOfPages } = data;
  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2> No Jobs To Display...</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h5>
        {totalJobs} job{jobs.length > 1 && "s"} found.
      </h5>
      <div className="jobs">
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />; // spread operator is used to pass all properties.
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};
export default JobsContainer;

// This is a piece of code written in React, a popular JavaScript library for building user interfaces.

// Here's a breakdown of what this code does:

// {jobs.map((job) => { return <Job key={job._id} {...job} />; })}
// : This is a JavaScript expression inside JSX (JavaScript XML). It's using the
// map
//  function to iterate over an array called
// jobs
// . For each
// job
//  in the
// jobs
//  array, it's returning a
// Job
//  component.

// <Job key={job._id} {...job} />
// : This is a React component named
// Job
// . Each
// Job
//  component is given a unique
// key
//  prop, which helps React identify which items have changed, are added, or are removed. Keys should be given to the elements inside the array to give the elements a stable identity. The
// key
//  here is set to
// job._id
// , assuming that
// _id
//  is a unique identifier in each
// job
//  object.

// {...job}
// : This is the spread operator in JavaScript. It's used here to pass all properties of the
// job
//  object as props to the
// Job
//  component. For example, if
// job
//  has properties like
// title
//  and
// description
// , it's equivalent to writing
// <Job key={job._id} title={job.title} description={job.description} />
// .

// So, in summary, this code is creating a list of
// Job
//  components based on the
// jobs
//  array, and each
// Job
//  component receives the properties of a
// job
//  object as its props.
