import { useLoaderData } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { ChartsContainer, StatsContainer } from "../components";
import { useQuery } from "@tanstack/react-query";

// stats query loader. code refactored statsQuery -- main
const statsQuery = {
  queryKey: ["stats"],
  queryFn: async () => {
    const response = await customFetch.get("/jobs/stats");
    return response.data;
  },
};
// code refactored.. this loader became the queryClient before fetch the data
export const loader = (queryClient) => async () => {
  const data = await queryClient.ensureQueryData(statsQuery);
  return data;
};
const Stats = () => {
  // Inside this component, it's using the useQuery hook to fetch the data for statsQuery.

  const { data } = useQuery(statsQuery);
  // It then destructures the data object to get defaultStats and monthlyApplications.
  const { defaultStats, monthlyApplications } = data;
  // data -- is defaultStats and monthlyApplications
  return (
    <>
      <StatsContainer defaultStats={defaultStats} /> {/* stats showing */}
      {/* if length greater than 1 this chart container */}
      {monthlyApplications?.length > 1 && (
        <ChartsContainer data={monthlyApplications} />
      )}
    </>
  );
};
export default Stats;
