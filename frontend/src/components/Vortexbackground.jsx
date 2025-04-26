import React from "react";
import { Vortex } from "./ui/vortex";
import { Link } from "react-router-dom";

export function VortexDemoSecond() {
  return (
    <div className="w-screen mx-auto rounded-md  h-screen overflow-hidden">
      <Vortex
        backgroundColor="black"
        rangeY={800}
        particleCount={500}
        baseHue={220}
        className="flex items-center flex-col justify-center px-2 md:px-10  py-4 w-full h-full"
      >
        {/* Hero Section */}
        <div className="text-white text-center py-2 flex-1 flex flex-col justify-center items-center">
          <h1
            className="text-7xl font-sans font-bold text-center mb-8 tracking-wide  drop-shadow-lg"
            style={{
              WebkitTextStroke: "2px white",
              WebkitTextFillColor: "white", //#581c87 -purple
            }}
          >
            Fitabit
          </h1>

          <h3 className="text-2xl  mt-4 mb-6 mx-auto max-w-3xl">
            "Dedication + Fitness = A Better You. Fitabit Makes It Real!"
          </h3>

          <h2 className="text-4xl text-center font-bold mb-10 text-white">
            "From Plans to Progress, Fitabit Powers Your Fitness!
          </h2>
          <Link
            to="/register"
            className="relative inline-flex items-center gap-x-1.5 rounded-md bg-purple-700 px-6 py-4 text-md font-semibold text-white shadow-sm hover:bg-purple-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 animate-pulse"
          >
            Start your Journey...
          </Link>
        </div>
      </Vortex>
    </div>
  );
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
