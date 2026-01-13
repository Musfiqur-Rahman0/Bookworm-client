import { LogInComponent } from '@/components/login2'


export const Login = () => {
  return (
    <div>
        <LogInComponent  logo={{
            alt : "title",
            url : "title",
            className : "test",
            src : "nai",
            title : "nai"
            
        }}
        signupUrl='/signup'
        />
    </div>
  )
}
