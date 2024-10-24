import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { pathNames } from "../constants";
import AuthLayout from "../layouts/AuthLayout";
import MasterLayout from "../layouts/MasterLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";

export interface IRouter {
  path: string;
  element: React.ReactNode;
  children?: IRouter[];
}

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
            path: pathNames.HOME,
            element: <Home />,
          },
        ],
      },
    ],
  },
]);

export default router;
