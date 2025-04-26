import { CircularProgress } from "@mui/material";
import React from "react";

const Button = ({
  text,
  isLoading,
  isDisabled,
  rightIcon,
  leftIcon,
  type,
  onClick,
  flex,
  small,
  outlined,
  full,
}) => {
  return (
    <div
      onClick={() => !isDisabled && !isLoading && onClick()}
      className={`
        ${isDisabled || isLoading ? "opacity-80 cursor-not-allowed" : ""}
        ${
          type === "secondary"
            ? "bg-secondary border-secondary"
            : "bg-primary border-primary"
        }
        ${outlined ? "bg-transparent text-primary border-2" : "border"}
        ${small ? "px-4 py-2" : "px-6 py-4"}
        ${full ? "w-full" : ""}
        ${flex ? "flex-1" : ""}
        text-white bg-purple-700 hover:bg-purple-600 font-medium text-sm rounded-lg shadow-lg flex items-center justify-center gap-2 transition-all ease-in-out duration-300
      `}
    >
      {isLoading && (
        <CircularProgress
          style={{ width: "18px", height: "18px", color: "blue" }}
        />
      )}
      {leftIcon}
      {text}
      {isLoading && <> . . .</>}
      {rightIcon}
    </div>
  );
};

export default Button;
