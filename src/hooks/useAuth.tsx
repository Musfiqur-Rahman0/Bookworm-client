import API, { setAccessToken } from "@/api/Api";
import { useState, useContext, createContext, useEffect  } from "react";


type User = { id: string; email: string; role: string };
type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
  loading : boolean | null;
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
 
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true)

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
    await API.post("/logout"); 
    setAccessToken(null);
    setUser(null);
  };

    const refreshToken = async () => {
        try {
            const res = await API.post("/refresh");
            setAccessToken(res?.data?.accessToken);
            setUser(res?.data?.user);
        } catch (error) {
            setUser(null)
            
        }finally{
            setLoading(false)
        }
    }


    useEffect(()=> {
        refreshToken()
    }, [])


  return {  user, login, logout,  refreshToken, loading};
}
