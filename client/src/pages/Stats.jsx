import { useLoaderData } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { ChartsContainer, StatsContainer } from "../components";

export const loader = async () => {
  try {
    const response = await customFetch.get("/jobs/stats");
    return response.data;
  } catch (error) {
    return error;
  }
};
const Stats = () => {
  // accessing the data
  const { defaultStats, monthlyApplications } = useLoaderData();

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
