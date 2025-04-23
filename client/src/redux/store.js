import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/userSlice'
import employerReducer from "./features/employerSlice";



export const store = configureStore({
  reducer: {
    user: userReducer,
    employer: employerReducer,

  },
})