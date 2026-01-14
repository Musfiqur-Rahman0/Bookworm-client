import Root from "@/layouts/Root";
import { Login } from "@/pages/auth/Login";
import { Signup } from "@/pages/auth/Signup";
import { Admin } from "@/pages/Dashboard/Admin";

import Error from "@/pages/Error";
import ProtectedRoute from "./ProtectedRoute";
import { createBrowserRouter } from "react-router";
import { unauthozied } from "@/pages/auth/unauthozied";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute allowedRoles={["admin", "user"]}>
        <Root />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "admin-dashboard",
        Component: Admin,
      },
    ],
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/signup",
    Component: Signup,
  },
  {
    path: "/unauthorized",
    Component: unauthozied,
  },
  {
    path: "*",
    Component: Error,
  },
]);

export default router;
