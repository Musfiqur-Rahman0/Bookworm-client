import Root from "@/layouts/Root";
import { Admin } from "@/pages/Dashboard/Admin";
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
]);

export default router;






