import React from "react";
import { Vortex } from "./ui/vortex";
import { Link } from "react-router-dom";

const AccessDenied = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Vortex
        backgroundColor="black"
        rangeY={800}
        particleCount={500}
        baseHue={220}
        className="flex items-center flex-col justify-center px-2 md:px-10  py-4 w-full h-full"
      >
        <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-lg shadow-xl">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Cannot access it without joining with us !
            </h2>
            <h4 className="mt-6 text-xl font-extrabold text-gray-900">
              You are one step away from us :(
            </h4>
            <p className="mt-2 text-medium text-gray-600">
              Join us in this exciting journey by simply creating account.
            </p>

            <Link
              to="/register"
              className="mt-4 text-center inline-flex items-centergap-x-1.5 rounded-md bg-purple-700 px-3 py-2 text-md font-semibold text-white shadow-sm hover:bg-purple-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 "
            >
              Create Account
            </Link>
          </div>
        </div>
      </Vortex>
    </div>
  );
};

export default AccessDenied;
