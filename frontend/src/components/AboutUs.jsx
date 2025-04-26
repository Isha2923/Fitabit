import React from "react";
import { FiMail, FiLock } from "react-icons/fi";

import { CiUser } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { FaReact, FaCalendarCheck } from "react-icons/fa";
import { IoMdFitness } from "react-icons/io";
import { FaPersonCircleCheck } from "react-icons/fa6";
import { MdNetworkCheck } from "react-icons/md";

import { Vortex } from "./ui/vortex";

const AboutUs = () => {
  return (
    <div className="flex items-center justify-center h-auto w-screen bg-black">
      <Vortex
        backgroundColor="black"
        rangeY={800}
        particleCount={500}
        baseHue={220}
        className="flex items-center flex-col justify-center px-2 md:px-10  py-4 w-full h-full"
      >
        <div className="max-w-xl mt-10 pt-2 w-full space-y-4 p-10 pb-2 mb-5 bg-gray-200 rounded-lg shadow-xl">
          <div className="text-center">
            <h2 className="mt-1 text-2xl font-extrabold mb-2 text-gray-900">
              About Us
            </h2>
            {/* Technologies Section */}
            <div className="bg-gray-200 py-1">
              <div className="container mx-auto ">
                <h2 className="text-2xl text-center font-extrabold mb-4 text-black ">
                  Fitabit
                </h2>
                <h5 className="text-xl mt-2 font-bold text-center font-extrabold  mb-5 text-black">
                  "Shape It, Forge It, Own It."
                </h5>
                {/* <p className=" text-xl font-bold mb-4 text-gray-600">
                  "From Habits to Gains, Fitabit Tracks It All!"
                </p> */}

                <p className=" text-sm text-justify  mb-1 text-black">
                  Fitabit is your ultimate fitness companion, designed to help
                  you track, manage, and achieve your health goals with
                  precision and ease. Whether you're a fitness enthusiast or
                  just starting your journey, Fitabit empowers you to forge a
                  path to a healthier, stronger you. With personalized workout
                  tracking, insightful analytics, and a community-driven
                  approach, Fitabit is more than just a fitness tracker—it's a
                  platform that transforms habits into lifelong wellness. Stay
                  motivated, monitor your progress, and unlock your full
                  potential with Fitabit at your side.
                </p>
                <h3 className="text-lg pt-0 mt-0 text-center font-bold mb-3 text-black">
                  Features of Fitabit
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-center max-w-xs">
                    <IoMdFitness className="text-violet-600 mx-auto text-5xl mb-1" />
                    <h3 className="text-lg font-bold mb-1 text-black">
                      Fitness Tracker
                    </h3>
                    <p className="text-sm break-words text-black">
                      Track and monitor fitness journey with personalized
                      progress reports.
                    </p>
                  </div>

                  <div className="text-center max-w-xs">
                    <FaCalendarCheck className="text-purple-600 mx-auto text-5xl mb-1" />
                    <h3 className="text-lg font-bold mb-1 text-black">
                      Daily Workout Tracker
                    </h3>
                    <p className="text-sm break-words text-black">
                      Log your workouts daily to maintain consistency and track
                      improvements.
                      {/* Manage your habits to maintain consistency and achieve
                      your daily goals. */}
                    </p>
                  </div>

                  <div className="text-center max-w-xs">
                    <FaPersonCircleCheck className="text-teal-400 mx-auto text-5xl mb-1" />
                    <h3 className="text-lg font-bold mb-1 text-black">
                      Health Tracker
                    </h3>
                    <p className="text-sm break-words text-black mb-1">
                      Sync your health data with us for real-time updates.
                    </p>
                  </div>

                  <div className="text-center max-w-xs">
                    <MdNetworkCheck className="text-blue-700 mx-auto text-5xl mb-1" />
                    <h3 className="text-lg font-bold mb-1 text-black">
                      Calorie Tracker
                    </h3>
                    <p className="text-sm break-words text-black mb-1">
                      View total and average calories burned to fine-tune your
                      goals.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Vortex>
    </div>
  );
};

export default AboutUs;
