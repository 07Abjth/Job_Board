import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/UserSlice'
import employerReducer from "./features/EmployerSlice";



export const store = configureStore({
  reducer: {
    user: userReducer,
    employer: employerReducer,

  },
})