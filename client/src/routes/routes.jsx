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
import { PostJob } from '../pages/user/PostJob'
import { UserDashboard } from '../pages/user/UserDashboard'

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
          { path: "job-details", element: <JobDetails /> },
          { path: "post-job", element: <PostJob /> },
          { path: "saved-jobs", element: <SavedJobs /> },
          { path: "user-dashboard", element: <UserDashboard /> },


        //   { path: "contact", element: <Contact /> },
        //   { path: "about", element: <About /> },
        //   { path: "course-details-page/:id", element: <CourseDetailsPage /> },
        //   { path: "course-page", element: <CoursePage /> },
         
          
          //Protected Routes
          {
            element: <ProtectedRoutes />,
            path: "user",
            children: [
          { path: "wishlist", element: <SavedJobs /> },
        //   { path: "create-course-page", element: <CreateCoursePage/> },
        //   { path: "profile", element: <Profile /> },
        //   { path: "my-learnings", element: <MyLearnings /> },
        //   { path: "cart", element: <Cart /> },
        //   { path: "order", element:  <h1>order page</h1> },
        ],
           
        },
    
        ],
      },
])

 