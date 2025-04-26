import React from "react";
import { useQuery } from "@tanstack/react-query"; //!imp use here - react query
import { useSelector } from "react-redux"; //!imp use here - react redux
import { profileAPI } from "../services/userService";
import AlertMessage from "./AlertMessage";
import { Vortex } from "./ui/vortex";
const UserProfile = () => {
  //!get the token from store using useselector and having access to the state - return user object from here
  const userData = useSelector((state) => state?.auth?.user); //!use selector - vimp - access state.auth.user - returns the user object containing user details

  //!without destructuring usequery in lhs - we get entire big object - so sir destructures it

  // const queries = useQuery({
  //   //!already destructured the data getting from usequery
  //   queryKey: ["profile"], //!can provide any name u want
  //   queryFn: () => profileAPI(userData?.token), //!call this function present in authslice.js and pass token  by accessing from user object
  // });
  // console.log(queries); //!printed in console - it is an object which returns many prop. - in data prop - we have access to user , so only 4 prop we need - so destructure this object and directly access only 4 prop.

  const { data, isLoading, isError, error } = useQuery({
    //!already destructured the data getting from usequery
    queryKey: ["profile"], //!can provide any name u want
    queryFn: () => profileAPI(userData?.token), //!call this function present in authslice.js and pass token  by accessing from user object
  });
  console.log(data); //!see isme user.username access from here - see entire object printed in console - inside it have user prop and other prop.

  const user = {
    //!some static data already provide
    username: "JaneDoe",
    email: "jane.doe@example.com",
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <Vortex
        backgroundColor="black"
        rangeY={800}
        particleCount={500}
        baseHue={220}
        className="flex items-center flex-col justify-center px-2 md:px-10  py-4 w-full h-full"
      >
        {/*//! display alert message - no need of mutation - isloading and iserror already able to access from usequery */}
        {isLoading && (
          <AlertMessage type="loading" message="Loading please wait..." />
        )}

        {isError && (
          <AlertMessage type="error" message={error.response.data.message} />
        )}
        <div className="px-10 py-20 bg-gray-100 text-center rounded-lg">
          <div className="mb-4">
            <img
              className="rounded-full h-24 w-24 mx-auto border-2 border-gray-300"
              src="https://cdn-icons-png.flaticon.com/512/9094/9094119.png"
              alt="Profile"
            />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            {data?.user?.username}
            {/* //!use optional chaining - to access data.user.username and same for email */}
          </h2>
          <p className="text-gray-700">{data?.user?.email}</p>
        </div>
      </Vortex>
    </div>
  );
};

export default UserProfile;
