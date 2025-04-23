import { createSlice } from "@reduxjs/toolkit"; 

const initialState = {
  isUserAuth: false,
  userData: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveUserData: (state, action) => {
      state.isUserAuth = true;
      state.userData = action.payload;
      console.log("User saved in Redux:", state.userData); // Debugging Redux state
    },

    clearUserData: (state) => {
      state.isUserAuth = false;
      state.userData = {};
    },
  },
});

// Action creators are generated for each case reducer function
export const { saveUserData, clearUserData } = userSlice.actions;
export default userSlice.reducer;
