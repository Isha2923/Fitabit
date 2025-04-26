import React from "react";
import { FiMail, FiLock } from "react-icons/fi";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query"; //!2 MOST IMP API -> usemutation and usequery -here only use mutation one
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { loginAPI } from "../services/userService";
import AlertMessage from "./AlertMessage";
import { loginAction } from "../redux/slices/authSlice";

import { Vortex } from "./ui/vortex";

//! Validation schema
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

//!react query logic - must see
const Login = () => {
  //! Mutation here
  const mutation = useMutation({
    mutationFn: loginAPI, //!present in userService.js file
    mutationKey: ["login"],
  });
  //! //!Dispatch action from redux - use inbuilt hook/api
  const dispatch = useDispatch();

  //!Handle form using formik
  const formik = useFormik({
    initialValues: {
      email: "thomas@gmail.com",
      password: "12345",
    },
    validationSchema,
    onSubmit: (values) => {
      //! Implementation of form submission -> dispatch action
      mutation
        .mutateAsync(values)
        .then((data) => {
          //!Dispatch action from redux - using inbuilt hook/api called usedispatch- import in line 4 above and line 27 above
          console.log(data); //!here sure that the user is logged in
          dispatch(loginAction(data)); //!call above function and pass in it -> use loginaction defined in authslice.js and pass payload=data to above line 27 function

          //!Save the user into localStorage - to persist user  if refresh the website ->after refresh - able to see user in state tab under redux dev tool.
          localStorage.setItem("userInfo", JSON.stringify(data)); //!use js method -> setitem use to save the user data as key value pair - see in inspect - application - local storage - link of website - after login - user is saved
        })
        .catch((e) => console.log(e));
      //
    },
  });
  console.log(mutation);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Vortex
        backgroundColor="black"
        rangeY={800}
        particleCount={500}
        baseHue={220}
        className="flex items-center flex-col justify-center px-2 md:px-10  py-4 w-full h-full"
      >
        <div className="max-w-md w-full space-y-8 p-10 bg-[white] rounded-lg shadow-xl">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Welcome Back!
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              New here?
              <Link
                to="/register"
                className="font-medium text-purple-700 hover:text-purple-500"
              >
                Create an account
              </Link>
            </p>
          </div>
          {/* //! display alert message */}

          {/* //!below both ways work perfect */}
          {/* //! normally without using ext comp or additional css */}
          {/* {mutation.isPending && <p>Loading.....</p>}
        {mutation.isSuccess && <p>Login Success</p>}
        {mutation.isError && <p>{mutation.error.response.data.message}</p>} */}

          {/* //! using ext comp or additional css  - see in alertmsg.jsx file */}
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
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 p-4 sm:text-sm border-gray-300 rounded-md"
                    placeholder="Email address"
                    {...formik.getFieldProps("email")}
                  />
                </div>
                {formik.touched.email && formik.errors.email && (
                  <p className="mt-2 text-sm text-red-600">
                    {formik.errors.email}
                  </p>
                )}
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
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 p-4 sm:text-sm border-gray-300 rounded-md"
                    placeholder="Password"
                    {...formik.getFieldProps("password")}
                  />
                </div>
                {formik.touched.password && formik.errors.password && (
                  <p className="mt-2 text-sm text-red-600">
                    {formik.errors.password}
                  </p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-700 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-600"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </Vortex>
    </div>
  );
};

export default Login;
