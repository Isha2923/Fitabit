import React from "react";
import { FiMail, FiLock } from "react-icons/fi";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import * as Yup from "yup";
import { CiUser } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { registerAPI } from "../services/userService";
import AlertMessage from "./AlertMessage";
import { Vortex } from "./ui/vortex";

//! Validation schema
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: Yup.string().required("Pasword is required"),
  username: Yup.string().required("Username is required"),
});
const Register = () => {
  //! Mutation here - same copy paste as done in login.jsx -> and use registerAPI defined in userservice.js.
  const mutation = useMutation({
    mutationFn: registerAPI,
    mutationKey: ["register"],
  });
  //! Navigate -> create instance of useNavigate - import from react-router-dom
  const navigate = useNavigate();

  //!Handle form using formik
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      username: "",
    },
    validationSchema,
    onSubmit: (values) => {
      //!Make http request
      //!Implementation of form submission
      //!copy this onsubmit part from above login.jsx -> and instead of dispatching and save user into localstorage - >we directly redirect to login page
      mutation
        .mutateAsync(values)
        .then((data) => {
          //!redirect login
          navigate("/login");
        })
        .catch((e) => console.log(e));
    },
  });

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
              Create Your Account
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Already have an account?
              <Link
                to="/login"
                className="font-medium text-purple-700 hover:text-purple-500"
              >
                Sign in
              </Link>
            </p>
          </div>
          {/* //! display alert message  as same did for login */}
          {mutation.isPending && (
            <AlertMessage type="loading" message="Loading please wait..." />
          )}
          {mutation.isSuccess && (
            <AlertMessage type="success" message="Login Success" />
          )}
          {mutation.isError && (
            <AlertMessage
              type="error"
              message={mutation.error.response.data.message}
            />
          )}
          <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="mb-4">
                <label htmlFor="username" className="sr-only">
                  Username
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <CiUser className="h-5 w-5 text-gray-400" />{" "}
                    {/* Assuming CiUser is imported */}
                  </div>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    {...formik.getFieldProps("username")}
                    required
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 p-2 sm:text-sm border-gray-300 rounded-md"
                    placeholder="Username"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="sr-only">
                  Email Address
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    {...formik.getFieldProps("email")}
                    required
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 p-2 mt-2 sm:text-sm border-gray-300 rounded-md"
                    placeholder="Email address"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    {...formik.getFieldProps("password")}
                    required
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 p-2 mt-2 sm:text-sm border-gray-300 rounded-md"
                    placeholder="Password"
                  />
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-700 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-600"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </Vortex>
    </div>
  );
};

export default Register;
