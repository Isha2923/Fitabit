import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

const CategoryChart = ({ data }) => {
  return (
    <div className="flex flex-1 flex-col gap-1.5 p-6 border rounded-lg shadow-md min-w-[340px] border-gray-200 dark:border-gray-800 shadow-gray-300 dark:shadow-gray-900 sm:p-4">
      <div className="font-semibold text-md dark:text-lg sm:text-base">
        Weekly Calories Burned
      </div>
      {data?.pieChartData && (
        <PieChart
          series={[
            {
              data: data?.pieChartData,
              innerRadius: 40,
              outerRadius: 85,
              paddingAngle: 5,
              cornerRadius: 5,
              labelStyle: {
                fontSize: "5px", // Set the font size
                //fill: "#555", // Set the label color
              },
              outerLabelOffset: 20, // Move labels outward to prevent overlap
            },
          ]}
          height={300}
        />
      )}
    </div>
  );
};

export default CategoryChart;
