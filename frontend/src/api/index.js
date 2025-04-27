import axios from "axios";

const API = axios.create({
  baseURL: "https://fitabit-lmfv.vercel.app/api",
    //"http://localhost:8000/api",
  //"https://fitabit-backend.vercel.app/api", //correct one for deployed
  //   "https://fitnesstrack-vtv1.onrender.com/api/", //nor correct
});

export const getDashboardDetails = async (token) => {
  try {
    return await API.get("/users/fitdashboard", {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error(
      "Error fetching dashboard details:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getWorkouts = async (token, date) =>
  await API.get(`/users/workout?date=${date}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const addWorkout = async (token, data) =>
  await API.post(`/users/workout`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const addReflection = async (data) =>
  await API.post(`/reflection`, data);
