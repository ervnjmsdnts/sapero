import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import Input from "../components/Input";
import GoogleLogin from "react-google-login";
import { gapi } from "gapi-script";
import { useSignIn } from "../api/signIn";
import toast from "react-hot-toast";
import { useAuth } from "../context/authContext";
import Spinner from "../components/Spinner";
import { useProfile } from "../api/profile";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object({
  email: yup.string().email().required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Signin = () => {
  useEffect(() => {
    function start() {
      gapi.client.init({
        client_Id:
          "1012734161089-tg6pa5gcqhb7s5r7oirek8e62733i1n9.apps.googleusercontent.com",
        scope: "",
      });
    }

    gapi.load("client:auth2", start);
  });

  const auth = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const { execute, isLoading } = useSignIn();
  const { mutate } = useProfile();

  const onSubmit = useCallback(
    async (data) => {
      let payload = { role: "user" };
      if (data.profileObj) {
        payload.googleId = data.profileObj.googleId;
        payload.firstName = data.profileObj.givenName;
        payload.lastName = data.profileObj.familyName;
        payload.email = data.profileObj.email;
        payload.provider = "google";
      } else {
        payload = { ...payload, ...data };
      }
      try {
        const {
          data: { token },
        } = await execute(payload);
        localStorage.setItem("token", token);
        auth.signIn();
        mutate("/users/current");
        toast.success("Successfully signed in");
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.error);
      }
    },
    [execute, auth, mutate]
  );

  if (auth.userRole === "admin" && auth.token) {
    return <Navigate to="/admin" />;
  }

  if (auth.token) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex justify-center h-[60vh]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center w-72 md:w-96 mt-12 gap-8">
        <div className="text-center">
          <h3 className="text-3xl font-semibold text-yellow-600">Welcome</h3>
          <p className="text-lg">Please enter your details</p>
        </div>
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
        <div className="text-center w-full">
          {isLoading ? (
            <button
              type="submit"
              disabled
              className="w-full flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:bg-yellow-300 bg-yellow-600 py-2 mb-4 hover:bg-yellow-500 rounded-lg mt-4 font-semibold">
              <Spinner />
              Signing in...
            </button>
          ) : (
            <button
              type="submit"
              className="w-full bg-yellow-600 py-2 mb-4 hover:bg-yellow-500 rounded-lg mt-4 font-semibold">
              Sign in
            </button>
          )}
          <p>
            Don't have an account?{" "}
            <Link
              to="/sign-up"
              className="text-yellow-600 hover:text-yellow-500 font-semibold">
              Sign up
            </Link>
          </p>
        </div>
        <div className="flex items-center w-full gap-2">
          <div className="w-full bg-gray-400 h-px" />
          <span className="text-gray-400">or</span>
          <div className="w-full bg-gray-400 h-px" />
        </div>
        <GoogleLogin
          clientId="1012734161089-tg6pa5gcqhb7s5r7oirek8e62733i1n9.apps.googleusercontent.com"
          className="w-full flex justify-center !rounded-lg"
          onSuccess={onSubmit}
          onFailure={(data) => console.log(data)}
        />
      </form>
    </div>
  );
};

export default Signin;
