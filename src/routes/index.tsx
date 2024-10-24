import { createBrowserRouter, redirect, RouteObject } from "react-router-dom";
import { pathNames } from "../constants";
import AuthLayout from "../layouts/AuthLayout";
import MasterLayout from "../layouts/MasterLayout";
import Attendance from "../pages/Attendance";
import Exam from "../pages/Exam";
import Grade from "../pages/Grade";
import Letter from "../pages/Letter";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import Notification from "../pages/Notification";
import Profile from "../pages/Profile";

const router = createBrowserRouter([
  {
    path: "",
    element: <MasterLayout />,
    children: [
      {
        path: pathNames.LOGIN,
        element: <Login />,
      },

      {
        path: pathNames.HOME,
        element: <AuthLayout />,
        children: [
          {
            path: pathNames.LOGOUT,
            element: <Logout />,
          },
          {
            path: pathNames.HOME,
            loader: () => {
              return redirect(pathNames.NOTIFICATION);
            },
          },
          {
            path: pathNames.NOTIFICATION,
            element: <Notification />,
          },
          {
            path: pathNames.LETTER,
            element: <Letter />,
          },
          {
            path: pathNames.ATTENDANCE,
            element: <Attendance />,
          },
          {
            path: pathNames.GRADE,
            element: <Grade />,
          },
          {
            path: pathNames.EXAM,
            element: <Exam />,
          },
          {
            path: pathNames.PROFILE,
            element: <Profile />,
          },
        ],
      },
    ],
  },
] as RouteObject[]);

export default router;
