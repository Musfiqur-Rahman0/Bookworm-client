import { useAuth } from '@/hooks/useAuth';
import React from 'react'

export const Admin = () => {

      const { user, login, logout } = useAuth();

      console.log(user)

  if (!user) return <button onClick={() => login("musfiqur2@gmail.com", "123041")}>Login</button>;

  return (
     <div>
      <h1>Welcome {user.email}</h1>
      {user.role === "admin" && <button>Admin Panel</button>}
      <button onClick={logout}>Logout</button>
    </div>
  )
}
