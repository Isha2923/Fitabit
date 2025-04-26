import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

const WeeklyStatCard = ({ data }) => {
  return (
    <div className="flex flex-col gap-1.5 p-6 border rounded-lg shadow-md min-w-[280px] border-gray-200 dark:border-gray-800 shadow-gray-300 dark:shadow-gray-900 sm:p-4">
      <div className="font-semibold text-lg text-primary dark:text-primary-dark sm:text-base">
        Weekly Calories Burned
      </div>
      {data?.totalWeeksCaloriesBurnt && (
        <BarChart
          xAxis={[
            { scaleType: "band", data: data?.totalWeeksCaloriesBurnt?.weeks },
          ]}
          series={[{ data: data?.totalWeeksCaloriesBurnt?.caloriesBurned }]}
          height={300}
        />
      )}
    </div>
  );
};

export default WeeklyStatCard;
