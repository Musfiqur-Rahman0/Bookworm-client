import API from "@/api/Api";
import { SignupComponent } from "@/components/signup1";
import { useNavigate } from "react-router";

export const Signup = () => {
  const navigate = useNavigate();
  interface FormValues {
    name: string;
    email: string;
    password: string;
    profile_picture: File;
  }

  const handleSignup = async (data: FormValues) => {
    try {
      if (!data.profile_picture) {
        alert("Please select a profile image!");
        return;
      }

      // 1️⃣ Upload image to IMGBB
      const formData = new FormData();
      formData.append("image", data.profile_picture);

      const api_key = import.meta.env.VITE_IMGBB_API_KEY;
      const imgbbRes = await fetch(
        `https://api.imgbb.com/1/upload?key=${api_key}`,
        { method: "POST", body: formData }
      );

      const imgbbData = await imgbbRes.json();

      if (!imgbbData.success) {
        alert("Image upload failed");
        return;
      }

      const imageUrl = imgbbData.data.url;

      // 2️⃣ Send user data to backend
      const userPayload = {
        name: data.name,
        email: data.email,
        password: data.password,
        profile_picture: imageUrl,
      };

      const res = await API.post("/users", userPayload);

      console.log("User created:", res.data);
      if(res.data.userId){
        navigate("/login");
        alert("Signup successful!");
      }
      
    } catch (error) {
      console.error(error);
      alert("Signup failed!");
    }
  };

  return (
    <div className="h-[100vh] w-full flex flex-col items-center justify-center">
      <SignupComponent
        buttonText="Sign Up"
        signupUrl="/login"
        onSubmit={handleSignup}
      />
    </div>
  );
};
