//!detailed explained in notes - must see - good vdo notes.

import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  //!Initial State
  name: "auth",
  initialState: {
    // user: {  //!if write this user me assign array of object - then able to see this
    //   isLogin: true,
    //   name: "Emma",
    // },
    //!pull the user from the local storage and place it in our store, and provide in the key value.
    user: JSON.parse(localStorage.getItem("userInfo")) || null,
  },
  //! Reducers
  reducers: {
    // ! Login
    loginAction: (state, action) => {
      state.user = action.payload;
    },
    // ! logout
    logoutAction: (state, action) => {
      //remove user from localStorage
      localStorage.removeItem("userInfo");
      state.user = null;
    },
  },
});

//! Generate the actions
export const { loginAction, logoutAction } = authSlice.actions;
//! Generate reducers
const authReducer = authSlice.reducer;
export default authReducer;
