import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { cn } from "@/lib/utils";

interface LoginFormProps {
  logo?: { alt: string; url: string; src: string; title: string };
  heading?: string;
  buttonText?: string;
  signupText?: string;
  signupUrl?: string;
  className?: string;
  onSubmit: (data: FormValues) => void; // handler passed from parent
}

interface FormValues {
  email: string;
  password: string;
}

export const LoginForm = ({
  logo,
  heading = "Login",
  buttonText = "Sign In",
  signupText = "Don't have an account?",
  signupUrl = "/signup",
  className,
  onSubmit,
}: LoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const submitHandler: SubmitHandler<FormValues> = (data) => {
    onSubmit(data);
  };

  return (
    <section className={cn("h-screen bg-muted", className)}>
      <div className="flex h-full items-center justify-center">
        <div className="flex flex-col items-center gap-6 lg:justify-start">
          {logo?.url && (
            <a href={logo.url}>
              <img
                src={logo.src}
                alt={logo.alt}
                title={logo.title}
                className="h-10 dark:invert"
              />
            </a>
          )}

          <form
            onSubmit={handleSubmit(submitHandler)}
            className="flex w-full max-w-sm min-w-sm flex-col items-center gap-y-4 rounded-md border border-muted bg-background !px-6 !py-8 shadow-md"
          >
            {heading && <h1 className="text-xl font-semibold">{heading}</h1>}

            {/* Email Field */}
            <div className="flex w-full flex-col gap-2">
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="Email"
                className="text-sm"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="flex w-full flex-col gap-2">
              <Label>Password</Label>
              <Input
                type="password"
                placeholder="Password"
                className="text-sm"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <p className="text-red-500 text-xs">{errors.password.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Logging in..." : buttonText}
            </Button>
          </form>

          <div className="flex justify-center gap-1 text-sm text-muted-foreground">
            <p>{signupText}</p>
            <Link to={signupUrl}>Signup</Link>
          </div>
        </div>
      </div>
    </section>
  );
};
