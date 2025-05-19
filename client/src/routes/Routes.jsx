import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

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
import { AboutPage } from "../pages/user/AboutPage";
import { ContactPage } from "../pages/user/ContactPage";
import { AdminDashboard } from "../components/admin/AdminDashboard";
import { AdminLayout } from "../components/layout/AdminLayout";
import { ProtectedRoutesAdmin } from "./ProtectedRoutesAdmin";
import { Subscription } from "../pages/shared/Subscription";
import { AppliedJobs } from "../pages/user/AppliedJobs";
import { PaymentCancelPage } from "../payment/PaymentCancelPage";
import { PaymentSuccessPage } from "../payment/PaymentSuccessPage";
 import { ManageJobApplications } from "../pages/employer/ManageJobApplications";
import { ManagePostedJobs } from "../pages/employer/ManagePostedJobs";
import { SettingsPage } from "../pages/shared/SettingsPage";
import { EmployerHomePage } from "../pages/employer/EmployerHomePage";
import ViewAllJobs from "../pages/user/premiumContents/ViewAllJobs";
 


export const router = createBrowserRouter([
  // USER Layout
  {
    path: "/",
    element: <UserLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "signup", element: <RegisterPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "job-list", element: <JobList /> },
      { path: "about", element: <AboutPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "job-details/:id", element: <JobDetails /> },
      { path: "subscription", element: <Subscription /> },

      // USER Protected Routes
      {
        element: <ProtectedRoutes />,
        children: [
          { path: "user/profile", element: <ProfilePage /> },
          { path: "user/settings", element: <SettingsPage /> },
          { path: "user/saved-job", element: <SavedJobs /> },
          { path: "user/user-dashboard", element: <UserDashboard /> },
          { path: "user/apply-job/:id", element: <ApplyForm /> },
          { path: "user/profile/edit", element: <EditProfile /> },
          { path: "user/applied-jobs", element: <AppliedJobs /> },
          { path: "user/payment/cancel", element: <PaymentCancelPage /> },
          { path: "user/payment/success", element: <PaymentSuccessPage /> },
          { path: "user/view-all-jobs", element: <ViewAllJobs /> },
        ],
      },
    ],
  },

  // EMPLOYER Layout
  {
    path: "/employer",
    element: <EmployerLayout />,
    errorElement: <ErrorPage />,
    children: [

      // Employer public pages
      { path: "signup", element: <RegisterPage role="employer" /> },
      { path: "login", element: <LoginPage role="employer" /> },

      // EMPLOYER Protected Routes
      {
        element: <ProtectedRoutesEmployer />,
        children: [
          { index: true, element: <Navigate to="/employer/home" /> },
          {index: true, path: "home", element: <EmployerHomePage /> },
          { path: "post-job", element: <PostJob /> },
          { path: "profile", element: <ProfilePage /> },
          { path: "manage-job-applications", element: <ManageJobApplications /> },
          { path: "manage-posted-jobs", element: <ManagePostedJobs /> },
          { path: "dashboard", element: <EmployerDashboard /> },

        ],
      },
    ],
  },

  // ADMIN Layout
  {
    path: "/admin",
    element: <AdminLayout />,
    errorElement: <ErrorPage />,
    children: [
      // Redirect root admin path to dashboard or login
      { index: true, element: <Navigate to="/admin/dashboard" /> },
      { path: "login", element: <LoginPage role="admin" /> },
      {
        element: <ProtectedRoutesAdmin />,
        children: [
          { path: "dashboard", element: <AdminDashboard /> },
        ],
      },
    ],
  },
]);
