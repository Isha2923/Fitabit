import React from "react";
import { VortexDemoSecond } from "./Vortexbackground.jsx";

const Homepage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <VortexDemoSecond />
    </div>
  );
};

export default Homepage;

{
  /* Hero Section */
}
{
  /* <div className="text-white text-center py-20 flex-1 flex flex-col justify-center items-center">
          <h1
            className="text-7xl font-bold text-center mb-4 tracking-wide uppercase drop-shadow-lg"
            style={{
              WebkitTextStroke: "2px white",
              WebkitTextFillColor: "#581c87",
            }}
          >
            Fitabit
          </h1>
          <p className="text-2xl mb-10 mx-auto max-w-4xl">
            "Habits + Fitness = The Perfect You. Fitabit Makes It Happen!"
          </p> */
}

{
  /*//!when i changed 2nd link tag's property to relative , then why link tag starts working fine but earlier it was not functioning well and not navigate to register route
          //! The issue you're experiencing could be related to the layout and positioning of the second <Link> element, which might have been affected by the default positioning properties (such as static or absolute) or stacking context of surrounding elements.
//!Here's why the relative property might solve the issue:
//!Layout Flow & Z-Index: When you apply relative to an element, it establishes a "stacking context" and can influence the layout positioning of that element in relation to other elements. If the second <Link> was not positioned correctly, or if it was being overlapped or hidden behind other elements, adding relative could have resolved this by ensuring it is properly layered above other elements and clickable.
//!1st link tag copied from the publicnavbar.jsx       
<Link
            to="/register"
            className="relative inline-flex items-center gap-x-1.5 rounded-md bg-purple-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 animate-pulse"
          >
            Register
          </Link> 

  
  //!2nd link tag 
  <Link
            to="/register"
            className="relative bg-violet-300 text-purple-950 px-10 py-4 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
          >
            Start your Journey..
          </Link> */
}

{
  /* //!above 1st link tag used bcs it looks more good */
}
{
  /* <Link
            to="/register"
            className="relative inline-flex items-center gap-x-1.5 rounded-md bg-purple-200 px-6 py-4 text-sm font-semibold text-purple-900 shadow-sm hover:bg-purple-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 animate-pulse"
          >
            Start your Journey...
          </Link>
        </div> */
}
{
  /* Technologies Section */
}
{
  /* <div className="bg-[#4e1f73] py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl text-center font-bold mb-16 text-white">
              "From Habits to Gains, Fitabit Tracks It All!"
            </h2>
            <div className="flex flex-wrap justify-center items-center gap-16">
              <div className="text-center max-w-xs">
                <IoMdFitness className="text-blue-950 mx-auto text-8xl mb-5" />
                <h3 className="text-2xl font-bold mb-2 text-white">
                  Fitness Tracker
                </h3>
                <p className="text-base break-words text-gray-300">
                  Track and monitor your fitness journey with personalized
                  progress reports.
                </p>
              </div>

              <div className="text-center max-w-xs">
                <FaCalendarCheck className="text-cyan-600 mx-auto text-8xl mb-5" />
                <h3 className="text-2xl font-bold mb-2 text-white">
                  Habit Tracker
                </h3>
                <p className="text-base break-words text-gray-300">
                  Manage your habits to maintain consistency and achieve your
                  daily goals.
                </p>
              </div>

              <div className="text-center max-w-xs">
                <FaPersonCircleCheck className="text-teal-400 mx-auto text-8xl mb-5" />
                <h3 className="text-2xl font-bold mb-2 text-white">
                  Health Tracker
                </h3>
                <p className="text-base break-words text-gray-300">
                  Sync your health data with us for real-time updates.
                </p>
              </div>

              <div className="text-center max-w-xs">
                <MdNetworkCheck className="text-blue-700 mx-auto text-8xl mb-5" />
                <h3 className="text-2xl font-bold mb-2 text-white">
                  Exercise Tracker
                </h3>
                <p className="text-base break-words text-gray-300">
                  Sync and log your exercise routines for progress tracking.
                </p>
              </div>
            </div>
          </div> */
}
{
  /* </div> */
}
