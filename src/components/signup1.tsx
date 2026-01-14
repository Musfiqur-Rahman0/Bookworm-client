import { useForm, } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router";

interface SignUpValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  profile_picture: FileList; // RHF will give FileList
}

interface SignupProps {
  buttonText?: string;
  signupUrl?: string;
  onSubmit: (data: {
    name: string;
    email: string;
    password: string;
    profile_picture: File;
  }) => void;
}

export const SignupComponent = ({
  buttonText = "Create Account",
  signupUrl = "/login",
  onSubmit,
}: SignupProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignUpValues>();

  const watchPassword = watch("password");

  const submitHandler: SubmitHandler<SignUpValues> = (data) => {
    const file = data.profile_picture?.[0];
    if (!file) {
      alert("Profile picture required!");
      return;
    }

    onSubmit({
      name: data.name,
      email: data.email,
      password: data.password,
      profile_picture: file,
    });
  };

  return (
 <>
   <div className="!p-5 shadow-lg rounded-md !py-8 ">
     <form
      onSubmit={handleSubmit(submitHandler)}
      className="flex  flex-col gap-4 max-w-sm mx-auto mt-10"
    >
      <Input
        placeholder="Name"
        {...register("name", { required: "Name is required" })}
      />
      {errors.name && <p className="text-red-500">{errors.name.message}</p>}

      <Input
        type="email"
        placeholder="Email"
        {...register("email", { required: "Email is required" })}
      />
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}

      <Input
        type="password"
        placeholder="Password"
        {...register("password", { required: "Password is required" })}
      />
      {errors.password && <p className="text-red-500">{errors.password.message}</p>}

      <Input
        type="password"
        placeholder="Confirm Password"
        {...register("confirmPassword", {
          required: "Confirm your password",
          validate: (value) => value === watchPassword || "Passwords do not match",
        })}
      />
      {errors.confirmPassword && (
        <p className="text-red-500">{errors.confirmPassword.message}</p>
      )}

      <Input
        type="file"
        accept="image/*"
        {...register("profile_picture", { required: "Upload a profile image" })}
      />
      {errors.profile_picture && (
        <p className="text-red-500">{errors.profile_picture.message}</p>
      )}

      <Button type="submit" disabled={isSubmitting}>
        {buttonText}
      </Button>
    </form>

  
   </div>
     <div className="!mt-4">
      <p className="text-center text-gray-500 text-sm">Already have an account? <Link to={"/login"}>Login</Link></p>
    </div> </>
  );
};
