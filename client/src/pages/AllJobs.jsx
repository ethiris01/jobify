import { toast } from "react-toastify";
import { JobsContainer, SearchContainer } from "../components";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import { useContext, createContext } from "react";
import { useQuery } from "@tanstack/react-query";

// queryClient
const allJobsQuery = (params) => {
  // queryClient for all jobs
  const { search, jobStatus, jobType, sort, page } = params;
  return {
    queryKey: [
      "jobs",
      search ?? "",
      jobStatus ?? "all",
      jobType ?? "all",
      sort ?? "newest",
      page ?? 1,
    ],
    queryFn: async () => {
      const { data } = await customFetch.get("/jobs", {
        params, // passing params with data.
      });
      return data;
    },
  };
};
// loader function is used to fetch the data
export const loader =
  (queryClient) =>
  async ({ request }) => {
    // console.log(request.url);
    // get params with request from url
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    // console.log(params);

    await queryClient.ensureQueryData(allJobsQuery(params));
    return { searchValues: { ...params } };
  };
// context for all jobs like a dashboard layout
const AllJobsContext = createContext();
const AllJobs = () => {
  const { searchValues } = useLoaderData();
  const { data } = useQuery(allJobsQuery(searchValues));
  // console.log(data); display all jobs in array.
  return (
    <AllJobsContext.Provider value={{ data, searchValues }}>
      <SearchContainer />
      <JobsContainer />
    </AllJobsContext.Provider>
  );
};

export const useAllJobsContext = () => useContext(AllJobsContext); //method call up as useAllJobsContext
export default AllJobs;
// main component
