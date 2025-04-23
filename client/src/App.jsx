import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Routes";
import React from "react";
import { Toaster } from "react-hot-toast";
import { ToastContainer } from 'react-toastify';


const App = () => {
  
  return (
  <>
   <RouterProvider router={router} />
   <Toaster />
  </>
  )
};

export default App;


