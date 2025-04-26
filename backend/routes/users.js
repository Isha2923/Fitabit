const express = require("express");
const { userCtrl, getDashboardDetails } = require("../controller/user");
const isAuthenticated = require("../middlewares/isAuth");

const router = express.Router();

//!Register
router.post("/api/users/register", userCtrl.register);
router.post("/api/users/login", userCtrl.login);
router.get("/api/users/profile", isAuthenticated, userCtrl.profile);
router.post("/api/users/contact", userCtrl.contact);
router.get("/api/users/fitdashboard", isAuthenticated, userCtrl.fitdashboard);
router.get("/api/users/workout", isAuthenticated, userCtrl.getWorkoutsByDate);
router.post("/api/users/workout", isAuthenticated, userCtrl.addWorkout);

module.exports = router;
