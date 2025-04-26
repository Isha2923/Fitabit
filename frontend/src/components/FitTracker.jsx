import React, { useEffect, useState } from "react";
import FitnessNavbar from "./FitnessNavbar.jsx";
import AccessDenied from "./AccessDenied.jsx";
import { Vortex } from "./ui/vortex";
import { useSelector } from "react-redux";
import { counts } from "../assets/data";
import CountsCard from "../components/cards/CountsCard";
import WeeklyStatCard from "../components/cards/WeeklyStatCard";
import CategoryChart from "../components/cards/CategoryChart";
import AddWorkout from "../components/AddWorkout.jsx";
import WorkoutCard from "../components/cards/WorkoutCard";
import { toast } from "react-hot-toast";

import {
  addWorkout,
  getDashboardDetails,
  getWorkouts,
  addReflection,
} from "../api";

const FitTracker = () => {
  const userData = useSelector((state) => state?.auth?.user);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [buttonLoading, setButtonLoading] = useState(false);
  const [todaysWorkouts, setTodaysWorkouts] = useState([]);
  const [workout, setWorkout] = useState(
    "#Legs\n-Back Squat\n-5 setsX15 reps\n-30 kg\n-10 min"
  );
  const [reflection, setReflection] = useState("");

  const dashboardData = async () => {
    setLoading(true);
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo?.token;
    const res = await getDashboardDetails(token);
    setData(res.data);

    // Show badges if earned (on dashboard load)
    if (res.data.badges?.length > 0) {
      res.data.badges.forEach((badge) => {
        toast.success(`🏆 New Badge Unlocked: ${badge}`);
      });
    }

    setLoading(false);
    return res.data;
  };

  const getTodaysWorkout = async () => {
    setLoading(true);
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo?.token;
    await getWorkouts(token, "").then((res) => {
      setTodaysWorkouts(res?.data?.todaysWorkouts || []);
      setLoading(false);
    });
  };

  const addNewWorkout = async () => {
    setButtonLoading(true);
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo?.token;
    try {
      const response = await addWorkout(token, { workoutString: workout });
      const newWorkout = response.data.workout;

      setTodaysWorkouts((prevWorkouts) => [...prevWorkouts, newWorkout]);

      // ✅ Important: Refresh dashboard to get updated streaks
      const latestData = await dashboardData();
      setData(latestData);
      getTodaysWorkout();

      const totalCalories = latestData?.totalCaloriesBurnt;

      if (totalCalories >= 4000) {
        toast.success("🏅 Congratulations! You've burnt 4000+ calories!");
      }

      // New badges logic if earned after adding workout
      const unlockedBadges = response.data.badges || [];
      unlockedBadges.forEach((badge) => {
        toast.success(`🎉 New Badge Unlocked: ${badge}`);
      });
    } catch (err) {
      toast.error(err.message || "Failed to add workout");
    } finally {
      setButtonLoading(false);
    }
  };

  const submitReflection = async () => {
    if (!reflection.trim()) {
      alert("Please write your reflection before submitting.");
      return;
    }

    const today = new Date().toISOString().split("T")[0];

    try {
      const response = await addReflection({ date: today, reflection });
      alert("Reflection added successfully!");
      setReflection("");
    } catch (error) {
      console.error(
        "Error submitting reflection:",
        error.response?.data || error.message
      );
      alert("Error submitting reflection.");
    }
  };

  useEffect(() => {
    dashboardData();
    getTodaysWorkout();
  }, []);

  return (
    <div className="min-h-screen w-screen flex flex-col bg-black">
      <Vortex
        backgroundColor="black"
        rangeY={800}
        particleCount={500}
        baseHue={220}
        className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
      >
        {userData ? (
          <>
            <FitnessNavbar />
            <div className="flex flex-1 h-full justify-center overflow-y-scroll py-5 bg-white">
              <div className="flex flex-col flex-1 max-w-[1400px] gap-5 sm:gap-3">
                {/* <div className="px-4 text-xl font-medium text-gray-800 dark:text-gray-100">
                  Dashboard
                </div>

             
                <div className="px-4">
                  <p>🔥 Current Streak: {data?.currentStreak || 0} days</p>
                  <p>🏆 Highest Streak: {data?.highestStreak || 0} days</p>
                </div> */}
                <div className="flex justify-between items-center px-4">
                  {/* Left side: Dashboard Title */}
                  <div className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                    Dashboard
                  </div>

                  {/* Right side: Streak Info */}
                  <div className="flex items-center gap-4">
                    {/* Current Streak */}
                    <div className="flex items-center bg-orange-100 text-orange-700 font-bold py-1 px-3 rounded-xl shadow-md">
                      🔥 {data?.currentStreak || 0}
                    </div>

                    {/* Highest Streak */}
                    <div className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                      Highest Streak: {data?.highestStreak || 0} days
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap justify-between gap-5 px-4 sm:gap-3">
                  {counts.map((item, index) => (
                    <CountsCard
                      key={item.id || index}
                      item={item}
                      data={data}
                    />
                  ))}
                </div>

                <div className="flex flex-wrap justify-between gap-5 px-4 sm:gap-3">
                  <WeeklyStatCard data={data} />
                  <CategoryChart data={data} />
                  <AddWorkout
                    workout={workout}
                    setWorkout={setWorkout}
                    addNewWorkout={addNewWorkout}
                    buttonLoading={buttonLoading}
                  />
                </div>

                {/* Reflection Section */}
                <div className="flex flex-col gap-4 px-4 sm:gap-3">
                  <div className="text-xl font-medium  text-gray-800 dark:text-gray-100">
                    Reflect on Today's Workout
                  </div>
                  <textarea
                    className="border rounded-lg p-3 w-full resize-none focus:outline-none focus:ring-2 focus:ring-purple-700"
                    rows="3"
                    placeholder="How did you feel after today's workout?"
                    value={reflection}
                    onChange={(e) => setReflection(e.target.value)}
                  />
                  <button
                    onClick={submitReflection}
                    className="bg-purple-700 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg w-fit self-end"
                  >
                    Submit Reflection
                  </button>
                </div>

                {/* Today's Workouts Section */}
                <div className="flex flex-col gap-5 px-4 sm:gap-3">
                  <div className="px-4 text-xl font-medium text-gray-800 dark:text-gray-100">
                    Today's Workouts
                  </div>
                  <div className="flex flex-wrap justify-center gap-5 mb-24 sm:gap-3">
                    {loading ? (
                      <Vortex />
                    ) : todaysWorkouts.length > 0 ? (
                      todaysWorkouts.map((workout, index) => (
                        <WorkoutCard
                          key={workout.id || index}
                          workout={workout}
                        />
                      ))
                    ) : (
                      <p>No workouts available today.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <AccessDenied />
        )}
      </Vortex>
    </div>
  );
};

export default FitTracker;
