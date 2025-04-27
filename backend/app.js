const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const router = require("./routes/users");
const errorHandler = require("./middlewares/errorHandler");
const reflectionRoutes = require("./routes/reflectionroutes"); // <-- add this
const app = express();

// Serve Static files
//app.use(express.static(path.join(__dirname, "client/build")));

require("dotenv").config();
//! Connect to mongodb
mongoose
  .connect(process.env.MONGO_URI) //!name of the database is FITABIT
  //!earlier used locally to run -> "mongodb://localhost:27017/fitabit"

  .then(() => console.log("Db connected successfully..."))
  .catch((e) => console.log(e));

//! Middlewares
app.use(express.json()); //pass incoming json data from the user
//Cors
const corsOptions = {
  //origin: ["http://localhost:5173"], //!write local website running link, server running on port 8000, port no and actual host no - both are diff things
  //origin: "https://fitabit.vercel.app",
  origin: "https://fitabit-habit-of-fitness.vercel.app/",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};
app.use(cors(corsOptions));
//!Routes
app.use("/", router);
app.use("/api/reflection", reflectionRoutes); // reflection route
//!error handler
app.use(errorHandler);
//! Start the server
const PORT = process.env.PORT || 8000; //!const PORT = 8000;  - same thing runs locally , now added in .env file
app.listen(PORT, console.log(`Server is up and running on ${PORT}`));

//!in above 3 routes created - register, login , and profile - all work perfectly in postman(web version)
//!in login route - used jwt token -> token able to see in response also correctly

//!VERY VERY IMP POINT FOR PROFILE ROUTER - it will not work in postman unless you pass additional header in it,

//! if not pass it , then it will not work error come that -> AUTHORIZATION TOKEN IS MISSING-> so chatgpt told this
//!steps -
//!Testing in Postman: When making a GET request to /profile, ensure you include the Authorization header:
//!Click on the Headers tab below the URL bar.Add the Authorization Header:
//!In the Key field, type Authorization.
//!In the Value field, type Bearer <your_token>, replacing <your_token> with the actual JWT you received from the login response for each user, it generates diff tokens.
//!example - Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

//! FOLLOW ABOVE STEPS -> /profile is working fine.
