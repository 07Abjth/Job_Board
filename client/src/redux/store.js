import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/UserSlice.js'
import employerReducer from "./features/EmployerSlice.js";



export const store = configureStore({
  reducer: {
    user: userReducer,
    employer: employerReducer,

  },
})