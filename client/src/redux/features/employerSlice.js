import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isEmployerAuth: false,
  employerData: {},
};

export const employerSlice = createSlice({
  name: "employer",
  initialState,
  reducers: {
    saveEmployerData: (state, action) => {
      state.isEmployerAuth = true;
      state.employerData = action.payload;
      console.log("Employer saved in Redux:", state.employerData);  
    },

    clearEmployerData: (state) => {
      state.isEmployerAuth = false;
      state.employerData = {};
    },
  },
});

export const { saveEmployerData, clearEmployerData } = employerSlice.actions;
export default employerSlice.reducer;
