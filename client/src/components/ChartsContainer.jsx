import { useState } from "react";

import BarChart from "./BarChart";
import AreaChart from "./AreaChart";
import Wrapper from "../assets/wrappers/ChartsContainer";

// setup the barChart state
const ChartsContainer = ({ data }) => {
  const [barChart, setBarChart] = useState();

  return (
    <Wrapper>
      <h4>Monthly Applications</h4>
      <button type="button" onClick={() => setBarChart(!barChart)}>
        {" "}
        {/* triggers the function between true or false */}
        {barChart ? "Area Chart" : "Bar Chart"}{" "}
        {/* if barCha is true it will display AreaCha*/}
      </button>
      {/*  while clicking the barChart and AreaChart to spin up. */}
      {barChart ? <BarChart data={data} /> : <AreaChart data={data} />}
    </Wrapper>
  );
};
export default ChartsContainer;
