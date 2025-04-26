import React from "react";

const CountsCard = ({ item, data }) => {
  // Ensure that data and data[item.key] are valid and are numbers
  const value = data && data[item.key];

  return (
    <div className="flex flex-1 gap-1.5 p-6 border rounded-lg shadow-md min-w-[200px] border-gray-200 dark:border-gray-800 shadow-gray-300 dark:shadow-gray-900">
      <div className="flex flex-1 flex-col gap-3 sm:gap-1.5">
        <div className="font-semibold text-lg text-primary dark:text-primary-dark sm:text-base">
          {item.name}
        </div>
        <div className="flex items-end gap-2 font-semibold text-4xl text-gray-800 dark:text-gray-100 sm:text-2xl">
          {/* Check if the value is defined and is a number before using toFixed */}
          {value !== undefined && !isNaN(value) ? value.toFixed(2) : "N/A"}
          <span className="text-sm mb-2">{item.unit}</span>
          {/* <span   //further update it 
            className={`text-base font-medium sm:text-sm mb-2 ${
              item.positive ? "text-green-500" : "text-red-500"
            }`}
          >
            (+10%)
          </span> */}
        </div>
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 sm:text-xs mb-1.5">
          {item.desc}
        </div>
      </div>
      <div
        className="flex items-center justify-center p-2 rounded-lg h-12"
        style={{
          backgroundColor: item.lightColor,
          color: item.color,
        }}
      >
        {item.icon}
      </div>
    </div>
  );
};

export default CountsCard;
