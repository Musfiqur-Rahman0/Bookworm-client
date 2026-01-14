import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router";



type UserRole = "user" | "admin";
interface RoleRouteProps {
  allowedRoles: UserRole[];
  children: ReactNode;
}

const ProtectedRoute = ({ allowedRoles, children }: RoleRouteProps) => {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }
  return <>{children}</>;
};
export default ProtectedRoute;
