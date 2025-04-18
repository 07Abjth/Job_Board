import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import {UserLayout} from '../components/layout/UserLayout'
import { HomePage } from '../pages/HomePage'
import { RegisterPage } from '../pages/shared/RegisterPage'
import { LoginPage } from '../pages/shared/LoginPage'
import { SavedJobs } from '../pages/user/SavedJobs'
import {ErrorPage} from '../pages/shared/ErrorPage'
import { ProtectedRoutes } from './ProtectedRoutes'
import { JobDetails } from '../pages/user/JobDetails'
import { JobList } from '../pages/user/JobList'
 import { UserDashboard } from '../pages/user/UserDashboard'
import { ApplyForm } from '../pages/user/ApplyForm'
import { UserProfile } from '../pages/user/UserProfile'

export const router = createBrowserRouter([

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
 
          
          //Protected Routes
          {
            element: <ProtectedRoutes />,
            path: "user",
            children: [
              { path: "user-profile", element: <UserProfile /> }, 

          { path: "saved-job", element: <SavedJobs /> }, 
          { path: "user-dashboard", element: <UserDashboard /> },
          { path: "apply-form", element: <ApplyForm /> },


        ],
           
        },
    
        ],
      },
])

 