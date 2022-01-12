import React from "react";
import BarChart from "react-apexcharts";

const initialState = {
  options: {
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: ["Audi", "Benz", "VW", ],
    },
  },
  series: [
    {
      name: "series-1",
      data: [30, 40, 45, ],
    },
  ],
};

const Chart = () => {
  const [data] = React.useState(initialState);
  return (
    <div>
      <BarChart
        options={data.options}
        series={data.series}
        type="bar"
        width="500"
      />
    </div>
  );
};

export default Chart;
