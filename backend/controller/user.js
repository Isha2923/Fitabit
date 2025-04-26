require("dotenv").config(); // Load environment variables from .env

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../model/User");
const Query = require("../model/Query");
const Workout = require("../model/Workout");
const createError = require("../error.js");

const userCtrl = {
  //!Register route logic -
  register: asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    //!Validations
    if (!username || !email || !password) {
      throw new Error("Please all fields are required");
    }
    //! check if user already exists
    const userExits = await User.findOne({ email });
    if (userExits) {
      throw new Error("User already exists");
    }
    //! Hash the user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //!Create the user
    const userCreated = await User.create({
      username,
      password: hashedPassword,
      email,
    });
    //!Send the response

    res.json({
      username: userCreated.username,
      email: userCreated.email,
      id: userCreated.id,
    });
  }),
  //!Login route logic
  login: asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    //!Check if user email exists
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    //!Check if user password is valid
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }
    //! Generate the token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    //!Send the response
    res.json({
      message: "Login success",
      token,
      id: user._id,
      email: user.email,
      username: user.username,
    });
  }),
  //!Profile route - must see note provided in app.js file
  profile: asyncHandler(async (req, res) => {
    //Find the user
    const user = await User.findById(req.user.id).select("-password");
    res.json({ user });
  }),

  //!Contact us route logic -
  contact: asyncHandler(async (req, res) => {
    const { name, email, query } = req.body;
    //!Validations
    if (!name || !email || !query) {
      throw new Error("Please all fields are required");
    }

    //!Create the user
    const queryCreated = await Query.create({
      name,
      email,
      query,
    });
    //!Send the response

    res.json({
      name: queryCreated.name,
      email: queryCreated.email,
      id: queryCreated.id,
      query: queryCreated.query,
    });
  }),

  //! fitdashboard route
  fitdashboard: asyncHandler(async (req, res, next) => {
    //!Find the user
    try {
      const userId = req.user?.id;
      const user = await User.findById(userId);
      if (!user) {
        return next(createError(404, "User not found"));
      }

      const currentDateFormatted = new Date();
      const startToday = new Date(
        currentDateFormatted.getFullYear(),
        currentDateFormatted.getMonth(),
        currentDateFormatted.getDate()
      );
      const endToday = new Date(
        currentDateFormatted.getFullYear(),
        currentDateFormatted.getMonth(),
        currentDateFormatted.getDate() + 1
      );

      //!calculate total calories burnt
      const totalCaloriesBurnt = await Workout.aggregate([
        {
          $match: { user: user._id, date: { $gte: startToday, $lt: endToday } },
        },
        {
          $group: {
            _id: null,
            totalCaloriesBurnt: { $sum: "$caloriesBurned" },
          },
        },
      ]);
      //Calculate total no of workouts
      const totalWorkouts = await Workout.countDocuments({
        user: userId,
        date: { $gte: startToday, $lt: endToday },
      });

      //Calculate average calories burnt per workout
      const avgCaloriesBurntPerWorkout =
        totalCaloriesBurnt.length > 0
          ? totalCaloriesBurnt[0].totalCaloriesBurnt / totalWorkouts
          : 0;

      // Fetch category of workouts
      const categoryCalories = await Workout.aggregate([
        {
          $match: { user: user._id, date: { $gte: startToday, $lt: endToday } },
        },
        {
          $group: {
            _id: "$category",
            totalCaloriesBurnt: { $sum: "$caloriesBurned" },
          },
        },
      ]);

      //Format category data for pie chart

      const pieChartData = categoryCalories.map((category, index) => ({
        id: index,
        value: category.totalCaloriesBurnt,
        label: category._id,
      }));

      const weeks = [];
      const caloriesBurnt = [];
      for (let i = 6; i >= 0; i--) {
        const date = new Date(
          currentDateFormatted.getTime() - i * 24 * 60 * 60 * 1000
        );
        weeks.push(`${date.getDate()}th`);

        const startOfDay = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate()
        );
        const endOfDay = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate() + 1
        );

        const weekData = await Workout.aggregate([
          {
            $match: {
              user: user._id,
              date: { $gte: startOfDay, $lt: endOfDay },
            },
          },
          {
            $group: {
              _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
              totalCaloriesBurnt: { $sum: "$caloriesBurned" },
            },
          },
          {
            $sort: { _id: 1 }, // Sort by date in ascending order
          },
        ]);

        caloriesBurnt.push(
          weekData[0]?.totalCaloriesBurnt ? weekData[0]?.totalCaloriesBurnt : 0
        );
      }

      //! ------------ New Streak Calculation Part ------------
      // Get last 7 days workouts
      const pastWorkouts = await Workout.find({ user: userId })
        .sort({ date: -1 })
        .limit(100); // adjust as needed

      let streak = 0;
      let lastDate = null;

      for (const workout of pastWorkouts) {
        const workoutDate = new Date(workout.date);
        const workoutDay = new Date(
          workoutDate.getFullYear(),
          workoutDate.getMonth(),
          workoutDate.getDate()
        );

        if (!lastDate) {
          lastDate = workoutDay;
          streak = 1;
        } else {
          const diffInDays = Math.floor(
            (lastDate - workoutDay) / (1000 * 60 * 60 * 24)
          );

          if (diffInDays === 1) {
            streak++;
            lastDate = workoutDay;
          } else if (diffInDays === 0) {
            continue; // same day multiple workouts
          } else {
            break;
          }
        }
      }

      //! Update highest streak in User model
      if (streak > (user.highestStreak || 0)) {
        user.highestStreak = streak;
        await user.save();
      }

      return res.status(200).json({
        totalCaloriesBurnt:
          totalCaloriesBurnt.length > 0
            ? totalCaloriesBurnt[0].totalCaloriesBurnt
            : 0,
        totalWorkouts: totalWorkouts,
        avgCaloriesBurntPerWorkout: avgCaloriesBurntPerWorkout,
        totalWeeksCaloriesBurnt: {
          weeks: weeks,
          caloriesBurned: caloriesBurnt,
        },
        pieChartData: pieChartData,
        currentStreak: streak,
        highestStreak: user.highestStreak || 0,
      });
    } catch (err) {
      next(err);
    }
    //res.json({ user });
  }),

  getWorkouts: asyncHandler(async (req, res) => {
    const user = req.user; // Access the authenticated user

    // Fetch workouts associated with the user
    const workouts = await Workout.find({ userId: user._id }); // Adjust if your schema uses a different field

    if (!workouts || workouts.length === 0) {
      res.status(404).json({ message: "No workouts found" });
    } else {
      res.status(200).json(workouts);
    }
  }),

  getWorkoutsByDate: asyncHandler(async (req, res, next) => {
    try {
      const userId = req.user?.id; // Extract authenticated user
      const { date } = req.query; // Get date from query parameter
      if (!userId) return next(createError(401, "Unauthorized user"));

      // Parse and validate date
      const workoutDate = date ? new Date(date) : new Date();
      if (isNaN(workoutDate)) return next(createError(400, "Invalid date"));

      const startOfDay = new Date(
        workoutDate.getFullYear(),
        workoutDate.getMonth(),
        workoutDate.getDate()
      );
      const endOfDay = new Date(
        workoutDate.getFullYear(),
        workoutDate.getMonth(),
        workoutDate.getDate() + 1
      );

      // Fetch workouts for the specified date
      const todaysWorkouts = await Workout.find({
        user: userId,
        date: { $gte: startOfDay, $lt: endOfDay },
      });

      // Calculate total calories burnt
      const totalCaloriesBurnt = todaysWorkouts.reduce(
        (total, workout) => total + workout.caloriesBurned,
        0
      );

      res.status(200).json({ todaysWorkouts, totalCaloriesBurnt });
    } catch (err) {
      next(err);
    }
  }),
  addWorkout: asyncHandler(async (req, res, next) => {
    try {
      const userId = req.user?.id;
      const { workoutString } = req.body;
      if (!workoutString) {
        return next(createError(400, "Workout string is missing"));
      }
      // Split workoutString into lines
      const eachworkout = workoutString.split(";").map((line) => line.trim());
      // Check if any workouts start with "#" to indicate categories
      const categories = eachworkout.filter((line) => line.startsWith("#"));
      if (categories.length === 0) {
        return next(createError(400, "No categories found in workout string"));
      }
      const parsedWorkouts = [];
      let currentCategory = "";
      let count = 0;

      // Loop through each line to parse workout details
      await eachworkout.forEach((line) => {
        count++;
        if (line.startsWith("#")) {
          const parts = line?.split("\n").map((part) => part.trim());
          console.log(parts);
          if (parts.length < 5) {
            return next(
              createError(
                400,
                `Workout string is missing for ${count}th workout`
              )
            );
          }
          //! Update current category
          currentCategory = parts[0].substring(1).trim();
          // Extract workout details
          const workoutDetails = userCtrl.parseWorkoutLine(parts);
          if (workoutDetails == null) {
            return next(createError(400, "Please enter in proper format "));
          }

          if (workoutDetails) {
            //! Add category to workout details
            workoutDetails.category = currentCategory;
            parsedWorkouts.push(workoutDetails);
          }
        } else {
          return next(
            createError(400, `Workout string is missing for ${count}th workout`)
          );
        }
      });
      // Calculate calories burnt for each workout
      await parsedWorkouts.forEach(async (workout) => {
        workout.caloriesBurned = parseFloat(
          userCtrl.calculateCaloriesBurnt(workout)
        );
        await Workout.create({ ...workout, user: userId });
      });

      // === BADGE code starts here ===
      const totalWorkouts = await Workout.countDocuments({ user: userId });

      const totalCaloriesBurned = await Workout.aggregate([
        { $match: { user: userId } },
        { $group: { _id: null, totalCalories: { $sum: "$caloriesBurned" } } },
      ]);

      let earnedBadges = [];

      if (totalWorkouts >= 7) {
        earnedBadges.push("🏅 7-Day Streak");
      }

      if ((totalCaloriesBurned[0]?.totalCalories || 0) >= 5000) {
        earnedBadges.push("🔥 5000 Calories Champion");
      }
      // === BADGE code ends ===

      return res.status(201).json({
        message: "Workouts added successfully",
        workouts: parsedWorkouts,
      });
    } catch (err) {
      next(err);
    }
  }),

  // !Function to parse workout details from a line
  parseWorkoutLine: (parts) => {
    const details = {};
    console.log(parts);
    if (parts.length >= 5) {
      details.workoutName = parts[1].substring(1).trim();
      details.sets = parseInt(parts[2].split("sets")[0].substring(1).trim());
      if (isNaN(details.sets) || details.sets <= 0) {
        return null; // or throw an error if needed, e.g., return next(createError(400, "Invalid value for sets"));
      }
      details.reps = parseInt(
        parts[2].split("sets")[1].split("reps")[0].substring(1).trim()
      );
      if (isNaN(details.reps) || details.reps <= 0) {
        return null; // or throw an error if needed, e.g., return next(createError(400, "Invalid value for sets"));
      }
      details.weight = parseFloat(parts[3].split("kg")[0].substring(1).trim());
      details.duration = parseFloat(
        parts[4].split("min")[0].substring(1).trim()
      );
      console.log(details);
      return details;
    }
    return null;
  },
  //! Function to calculate calories burnt for a workout
  calculateCaloriesBurnt: (workoutDetails) => {
    const durationInMinutes = parseInt(workoutDetails.duration);
    const weightInKg = parseInt(workoutDetails.weight);
    const caloriesBurntPerMinute = 5; // Sample value, actual calculation may vary
    return durationInMinutes * caloriesBurntPerMinute * weightInKg;
  },
};
const getDashboardDetails = asyncHandler(async (req, res) => {
  // const user = req.user;

  // if (!user) {
  //   res.status(401);
  //   throw new Error("Unauthorized user");
  // }

  // // Dummy response (replace with your logic)
  // const dashboardData = {
  //   workoutCount: 10,
  //   caloriesBurned: 500,
  //   lastWorkout: "2024-11-20",
  // };

  // res.status(200).json(dashboardData);
  try {
    const userId = req.user.id;

    const allWorkoutDates = await Workout.find({ user: userId }).select("date");

    const workoutDays = new Set(
      allWorkoutDates.map((w) =>
        new Date(
          w.date.getFullYear(),
          w.date.getMonth(),
          w.date.getDate()
        ).toISOString()
      )
    );

    // Streak Calculation
    let currentStreak = 0;
    let highestStreak = 0;
    let today = new Date();
    today.setHours(0, 0, 0, 0);

    while (workoutDays.has(today.toISOString())) {
      currentStreak++;
      today.setDate(today.getDate() - 1);
    }

    let tempStreak = 1;
    const sortedDays = [...workoutDays].sort(
      (a, b) => new Date(a) - new Date(b)
    );
    for (let i = 0; i < sortedDays.length - 1; i++) {
      const currentDate = new Date(sortedDays[i]);
      const nextDate = new Date(sortedDays[i + 1]);
      const diff = (nextDate - currentDate) / (1000 * 3600 * 24);

      if (diff === 1) {
        tempStreak++;
      } else {
        highestStreak = Math.max(highestStreak, tempStreak);
        tempStreak = 1;
      }
    }
    highestStreak = Math.max(highestStreak, tempStreak);

    // Badge logic based on streak
    const badges = [];
    if (currentStreak >= 30) badges.push("🎖️ 30-Day Streak Achiever");
    if (currentStreak >= 50) badges.push("🏅 50-Day Streak Master");
    if (currentStreak >= 100) badges.push("🥇 100-Day Legend");
    if (currentStreak >= 200) badges.push("🥈 200-Day Warrior");

    // Fetch other dashboard data (your original code continues here)

    return res.status(200).json({
      // your existing dashboard response here,
      currentStreak,
      highestStreak,
      badges,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = { userCtrl, getDashboardDetails };
