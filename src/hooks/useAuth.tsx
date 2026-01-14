import API, { setAccessToken } from "@/api/Api";
import { useState, useContext, createContext, useEffect  } from "react";



type User = { id: string; email: string; role: "admin" | "user" };
type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
  // signUp : ()=> Promise<void>;
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
  const [loading, setLoading] = useState<boolean>(true);



  // const signUp : (name : string, password : string, profile_picture : string) = async (nam)


  // LOGIN
// useAuth.ts
const login: (email: string, password: string) => Promise<User> = async (email, password) => {
  try {
    const res = await API.post("/login", { email, password });
    const { accessToken, user } = res.data as { accessToken: string; user: User };

    setAccessToken(accessToken);
    setUser(user);

    return user; // return user so parent component can handle navigation
  } catch (error: any) {
    console.error(error);
    throw new Error(error.response?.data?.message || "Login failed");
  }
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


  return {  user, login, logout,   refreshToken, loading};
}
