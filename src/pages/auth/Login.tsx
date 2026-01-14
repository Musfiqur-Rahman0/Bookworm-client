import { LoginForm } from '@/components/login2'
import { useAuth } from '@/hooks/useAuth'
import { useNavigate } from 'react-router';


export const Login = () => {
  const {login,user} =useAuth();
  const navigate = useNavigate();
  interface FormValues {
  email: string;
  password: string;
}

  const handleLogin =async (data : FormValues) => {
       try {
        await  login(data.email, data.password);
        
        if( user?.role === "admin"){
          navigate("/admin-dashboard");
        
        }else if(user?.role === "user"){
          navigate("/user-dashboard");
        }
        else {
           navigate("/login")
        }
       } catch (error) {
        alert("invalid credential!!!")
       }

  }
  return (
    <div>
        <LoginForm  logo={{
            alt : "title",
            url : "title",
            src : "nai",
            title : "nai"
            
        }}
        signupUrl='/signup'
        onSubmit={handleLogin}
        />
    </div>
  )
}
