import Root from "@/layouts/Root";
import { Login } from "@/pages/auth/Login";
import { Signup } from "@/pages/auth/Signup";
import { Admin } from "@/pages/Dashboard/Admin";
import { unauthozied } from "@/pages/unauthozied";
import {
  createBrowserRouter,
} from "react-router";

const  router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
   children : [
    {
      path : "/admin-dashboard",
      Component : Admin
    }
   ]
  },

  {
    path : "/login",
    Component : Login
  },
  {
    path : "/signup",
    Component : Signup
  },
  {
    path : "/unauthorized",
    Component : unauthozied
  }

]);

export default router;






