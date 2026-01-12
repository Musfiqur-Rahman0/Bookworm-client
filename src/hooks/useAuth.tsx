import API from "@/api/Api";
import { useState, useContext, createContext,  } from "react";


type User = { id: string; email: string; role: string };
type AuthContextType = {
  user: User | null;
  accessToken: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
};
type AuthProviderProps = { children: React.ReactNode };

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

function useProvideAuth(): AuthContextType {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  // LOGIN
  const login = async (email: string, password: string) => {
    const res = await API.post("/login", { email, password });
    const { accessToken, user } = res.data as { accessToken: string; user: User };
    setAccessToken(accessToken);
    console.log(user)
    setUser(user);
  };

  // LOGOUT
  const logout = async () => {
    await API.post("/logout"); // refresh cookie cleared
    setAccessToken(null);
    setUser(null);
  };

  // REFRESH TOKEN
  const refreshToken = async () => {
    const res = await API.post("/refresh");
    const { accessToken, user } = res.data as { accessToken: string; user: User };
    setAccessToken(accessToken);

    setUser(user);
  };

  return { accessToken, user, login, logout, refreshToken };
}
