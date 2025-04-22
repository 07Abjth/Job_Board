import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { UserLayout } from "../components/layout/UserLayout";
import { HomePage } from "../pages/HomePage";
import { RegisterPage } from "../pages/shared/RegisterPage";
import { LoginPage } from "../pages/shared/LoginPage";
import { SavedJobs } from "../pages/user/SavedJobs";
import { ErrorPage } from "../pages/shared/ErrorPage";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { JobDetails } from "../pages/user/JobDetails";
import { JobList } from "../pages/user/JobList";
import { UserDashboard } from "../pages/user/UserDashboard";
import { ApplyForm } from "../pages/user/ApplyForm";
 import { EmployerLayout } from "../components/layout/EmployerLayout";
import { EmployerDashboard } from "../pages/employer/EmployerDashboard";
import { PostJob } from "../pages/employer/PostJob";
import { ProfilePage } from "../pages/shared/ProfilePage";
import { ProtectedRoutesEmployer } from "./ProtectedRoutesEmployer";
import { EditProfile } from "../pages/shared/EditProfile";




export const router = createBrowserRouter([
  //  USER Layout
  {
    path: "/",
    element: <UserLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "signup", element: <RegisterPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "job-list", element: <JobList /> },
      { path: "job-details/:id", element: <JobDetails /> },

      //  USER Protected Routes
      {
        element: <ProtectedRoutes />,
        children: [
          { path: "user/profile", element: <ProfilePage /> },
          { path: "user/saved-job", element: <SavedJobs /> },
          { path: "user/user-dashboard", element: <UserDashboard /> },
          { path: "user/apply-form", element: <ApplyForm /> },
          { path: "user/profile/edit", element: <EditProfile /> },

        ],
      },
    ],
  },

  //  EMPLOYER Layout
  {
    path: "/employer",
    element: <EmployerLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "dashboard", element: <EmployerDashboard /> },

      //  Employer public pages
      { path: "signup", element: <RegisterPage role="employer" /> },
      { path: "login", element: <LoginPage role="employer" /> },

      //  EMPLOYER Protected Routes
      {
        element: <ProtectedRoutesEmployer />,
        children: [
          { path: "post-job", element: <PostJob role="employer"/> },
          { path: "profile", element: <ProfilePage role="employer"/> },
          
 
        ],
      },
    ],
  },
]);


