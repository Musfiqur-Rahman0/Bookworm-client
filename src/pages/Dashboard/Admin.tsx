import { useAuth } from "@/hooks/useAuth";

export const Admin = () => {
 const { user, logout, loading } = useAuth();


if (loading) return <p>Loading...</p>;

  return (
      <div>
    <h1>Welcome {user?.email}</h1>
    {user?.role === "admin" && <button>Admin Panel</button>}
    <button onClick={logout}>Logout</button>
  </div>
  );
};
