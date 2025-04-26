import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage.jsx";
import PublicNavbar from "./components/PublicNavbar.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import AboutUs from "./components/AboutUs.jsx";
import Contact from "./components/Contact.jsx";
import UserProfile from "./components/UserProfile.jsx";
import FitTracker from "./components/FitTracker.jsx";
import PrivateNavbar from "./components/PrivateNavbar";
import { useSelector } from "react-redux";
import TodayWorkout from "./components/TodayWorkout.jsx";
import { VortexDemoSecond } from "./components/Vortexbackground.jsx";
import Tutorials from "./components/Tutorials.jsx";
import { Toaster } from "react-hot-toast";

function App() {
  const userData = useSelector((state) => state?.auth?.user); //!useselector used -inbuilt in react - redux

  return (
    <>
      <BrowserRouter>
        {userData ? <PrivateNavbar /> : <PublicNavbar />}
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/user/fitdashboard" element={<FitTracker />} />
          <Route path="/user/workout" element={<TodayWorkout />} />
          <Route path="/tutorials" element={<Tutorials />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
