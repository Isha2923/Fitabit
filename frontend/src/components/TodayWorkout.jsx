import React, { useEffect, useState } from "react";
import WorkoutCard from "../components/cards/WorkoutCard";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers";
import { getWorkouts } from "../api";
import { CircularProgress } from "@mui/material";
import { useDispatch } from "react-redux";
import FitnessNavbar from "./FitnessNavbar.jsx";
import AccessDenied from "./AccessDenied.jsx";
import { Vortex } from "./ui/vortex";
import { useSelector } from "react-redux";

const TodayWorkout = () => {
  const userData = useSelector((state) => state?.auth?.user);
  const dispatch = useDispatch();
  const [todaysWorkouts, setTodaysWorkouts] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState("");

  const getTodaysWorkout = async () => {
    setLoading(true);
    //const token = localStorage.getItem("userInfo");
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo?.token;
    try {
      const res = await getWorkouts(token, date ? `?date=${date}` : "");
      // Ensure data is an array before setting it to state
      setTodaysWorkouts(res?.data?.todaysWorkouts || []); // Fallback to empty array if undefined
      setLoading(false);
    } catch (error) {
      console.error("Error fetching workouts:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getTodaysWorkout();
  }, [date]);

  return (
    <div className="min-h-screen w-screen flex flex-col bg-black">
      <Vortex
        backgroundColor="black"
        rangeY={800}
        particleCount={500}
        baseHue={220}
        className="flex items-center flex-col justify-center px-2 md:px-10  py-4 w-full h-full"
      >
        {userData ? <FitnessNavbar /> : <AccessDenied />}
        <div className="flex flex-1 w-full justify-center py-6 overflow-y-scroll bg-white">
          <div className="flex flex-1 max-w-screen-2xl gap-6 px-4">
            {/* Left Section: Date Picker */}
            <div className="flex-none w-2/5 p-4 border bg-gray-100 border-gray-200 rounded-lg shadow-md">
              <div className="font-semibold text-lg text-md mb-4">
                Select Date
              </div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar
                  onChange={(e) => setDate(`${e.$M + 1}/${e.$D}/${e.$y}`)}
                />
              </LocalizationProvider>
            </div>

            {/* Right Section: Workouts */}
            <div className="flex-1">
              <div className="flex flex-col gap-6 px-4">
                <div className="text-2xl font-semibold text-primary mb-4">
                  Today's Workout
                </div>
                {loading ? (
                  <CircularProgress />
                ) : (
                  <div className="flex flex-wrap justify-center gap-6 mb-20">
                    {todaysWorkouts.length > 0 ? (
                      todaysWorkouts.map((workout, index) => (
                        <WorkoutCard
                          key={workout.id || index}
                          workout={workout}
                        />
                      ))
                    ) : (
                      <p>No workouts available</p> // Show message if no workouts are available
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Vortex>
    </div>
  );
};
export default TodayWorkout;
