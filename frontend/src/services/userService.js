import axios from "axios"; //!used as httpclient (may - explore it )

//! Login
export const loginAPI = async ({ email, password }) => {
  //!destructure the argument getting from post request from user (email and pw provide)
  const response = await axios.post(
    "http://localhost:8000/api/users/login",
    // "https://fitabit-backend.vercel.app/api/users/login",
    {
      email,
      password,
    }
  );
  //!return a promise
  return response.data;
};

//! Register // return a promise - copy from above - same as above -> and take 3 things from form - email, pw, and username.
export const registerAPI = async ({ email, password, username }) => {
  const response = await axios.post(
    "http://localhost:8000/api/users/register",
    //"https://fitabit-backend.vercel.app/api/users/register",
    {
      email,
      password,
      username,
    }
  );
  //!return a promise
  return response.data;
};

//! profile // return a promise - difference is get method -> and it needs to access/pass token -> need to provide authorization header in postman with value "bearer you_token"
export const profileAPI = async (token) => {
  const response = await axios.get(
    "http://localhost:8000/api/users/profile",
    //"https://fitabit-backend.vercel.app/api/users/profile",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  //!return a promise
  return response.data;
};

//!  // return a promise - copy from above - same as above -> and take 3 things from form - email, pw, and username.
export const contactAPI = async ({ name, email, query }) => {
  const response = await axios.post(
    "http://localhost:8000/api/users/contact",
    //"https://fitabit-backend.vercel.app/api/users/contact",
    {
      name,
      email,
      query,
    }
  );
  //!return a promise
  return response.data;
};
