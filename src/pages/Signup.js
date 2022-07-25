import React, { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import { useSignUp } from "../api/signout";
import Input from "../components/Input";
import Spinner from "../components/Spinner";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { useSignIn } from "../api/signIn";
import { useAuth } from "../context/authContext";
import { useProfile } from "../api/profile";

const schema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email().required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirmation password is required"),
});

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const signUp = useSignUp();
  const signIn = useSignIn();
  const auth = useAuth();
  const { mutate } = useProfile();

  const isLoading = useMemo(() => {
    return signUp.isLoading || signIn.isLoading;
  }, [signUp.isLoading, signIn.isLoading]);

  const onSubmit = useCallback(
    async (data) => {
      const { email, password } = data;
      try {
        await signUp.execute(data);
        const {
          data: { token },
        } = await signIn.execute({ email, password });
        localStorage.setItem("token", token);
        auth.signIn();
        toast.success("Successfully signed up");
        mutate("/users/current");
      } catch (error) {
        toast.error(error.response.data.error);
      }
    },
    [signUp, signIn, auth, mutate]
  );

  if (auth.token) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex justify-center h-[70vh]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center w-72 md:w-96 mt-20 gap-4">
        <div className="text-center">
          <h3 className="text-3xl font-semibold text-yellow-600">
            Create Your Account
          </h3>
          <p className="text-lg">Please enter your details</p>
        </div>
        <Input
          {...register("firstName")}
          placeholder="Enter your first name..."
          label="First Name"
          errors={errors.firstName}
        />
        <Input
          {...register("lastName")}
          placeholder="Enter your last name..."
          label="Last Name"
          errors={errors.lastName}
        />
        <Input
          {...register("email")}
          placeholder="Enter your email..."
          label="Email"
          errors={errors.email}
        />
        <Input
          {...register("password")}
          placeholder="Enter your password..."
          label="Password"
          type="password"
          errors={errors.password}
        />
        <Input
          {...register("confirmPassword")}
          placeholder="Confirm your password..."
          label="Confirmation Password"
          type="password"
          errors={errors.confirmationPassword}
        />
        <div className="text-center w-full">
          {isLoading ? (
            <button
              type="submit"
              disabled
              className="w-full flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:bg-yellow-300 bg-yellow-600 py-2 mb-4 hover:bg-yellow-500 rounded-lg mt-4 font-semibold">
              <Spinner />
              Signing up...
            </button>
          ) : (
            <button
              type="submit"
              className="w-full bg-yellow-600 py-2 mb-4 hover:bg-yellow-500 rounded-lg mt-4 font-semibold">
              Sign up
            </button>
          )}
          <p>
            Already have an account?{" "}
            <Link
              to="/sign-in"
              className="text-yellow-600 hover:text-yellow-500 font-semibold">
              Sign in
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;
