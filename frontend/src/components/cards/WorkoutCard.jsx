import { FitnessCenterRounded, TimelapseRounded } from "@mui/icons-material";
import React from "react";

const WorkoutCard = ({ workout }) => {
  return (
    <div className="flex flex-1 flex-col gap-1.5 p-4 border rounded-lg shadow-md min-w-[250px] max-w-[400px] border-gray-200 dark:border-gray-800 shadow-gray-300 dark:shadow-gray-900 sm:p-3.5">
      <div className="w-fit text-sm font-medium text-primary bg-primary-light px-2.5 py-1 rounded-md">
        #{workout?.category}
      </div>
      <div className="text-lg font-semibold text-gray-800 dark:text-gray-100">
        {workout?.workoutName}
      </div>
      <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
        Count: {workout?.sets} sets X {workout?.reps} reps
      </div>
      <div className="flex gap-4">
        <div className="flex items-center gap-1.5 text-sm font-medium text-gray-800 dark:text-gray-100">
          <FitnessCenterRounded sx={{ fontSize: "20px" }} />
          {workout?.weight} kg
        </div>
        <div className="flex items-center gap-1.5 text-sm font-medium text-gray-800 dark:text-gray-100">
          <TimelapseRounded sx={{ fontSize: "20px" }} />
          {workout?.duration} min
        </div>
      </div>
    </div>
  );
};

export default WorkoutCard;
