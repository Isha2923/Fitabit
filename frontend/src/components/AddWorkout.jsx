import React from "react";
import Button from "./Button";

const AddWorkout = ({ workout, setWorkout, addNewWorkout, buttonLoading }) => {
  return (
    <div className="flex-1 min-w-[150px] p-6 border border-opacity-20 border-gray-500 rounded-xl shadow-md flex flex-col gap-2 sm:p-4">
      <div className="font-semibold text-lg text-primary sm:text-base">
        Add New Workout
      </div>

      {/* TextArea for workout input */}
      <div className="flex flex-col gap-2 ">
        <label className="text-sm text-gray-700">Workout</label>
        <textarea
          className="w-full p-2 border border-gray-300 rounded-lg bg-transparent text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-700"
          rows="10"
          placeholder={`Enter in this format:

#Category
-Workout Name
-Sets
-Reps
-Weight
-Duration`}
          value={workout}
          onChange={(e) => setWorkout(e.target.value)} // Update workout state on input change
        />
      </div>

      {/* Add Workout button */}
      <Button
        text="Add Workout"
        small
        onClick={addNewWorkout}
        isLoading={buttonLoading}
        isDisabled={buttonLoading}
      />
    </div>
  );
};

export default AddWorkout;
