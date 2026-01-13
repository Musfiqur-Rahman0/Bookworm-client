import { SignupComponent } from '@/components/signup1'


export const Signup = () => {
  return (
    <div>
        <SignupComponent logo={{
            alt : "title",
            url : "title",
           
            src : "nai",
            title : "nai"
        }} 
        buttonText='Sign Up'
        signupUrl='/login'
        
        />
    </div>
  )
}
