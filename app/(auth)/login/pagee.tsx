/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import Image from "next/image";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid credentials" }),
  password: z
    .string()
    .min(8, { message: "Invalid credentials" })
    .regex(/[A-Z]/, { message: "Invalid credentials" })
    .regex(/[a-z]/, { message: "Invalid credentials" })
    .regex(/\d/, { message: "Invalid credentials" })
    .regex(/[^a-zA-Z0-9]/, { message: "Invalid credentials" }),
});

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      loginSchema.parse({ email, password });

      const response = await axios.post("/api/login", {
        email,
        password,
        rememberMe,
      });

      if (response.status === 200) {
        setSuccess("Login successful! You will be redirected shortly.");
        toast.success("Login successful! You will be redirected shortly.");
        router.push("/admin/dashboard");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0]?.message || "Validation error");
      } else if (err.response && err.response.status === 429) {
        setError("Too many login attempts, please try again after an hour.");
      } else if (
        err.response &&
        err.response.data &&
        err.response.data.message
      ) {
        setError(err.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-white px-3 sm:bg-gray-200">
      <div className="w-full max-w-[28rem] space-y-5 rounded-lg bg-white px-4 pt-6 pb-16 text-gray-600 sm:border sm:border-gray-300 sm:bg-gray-50 sm:px-8 sm:shadow-md">
        <div className="text-center">
          <Image
            src={"/logo1.png"}
            width={150}
            height={150}
            className="mx-auto h-24 w-24"
            alt="logo"
          />
          <div className="mt-5">
            <h3 className="text-2xl font-bold text-gray-800 sm:text-3xl">
              Welcome to your account
            </h3>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="font-medium">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="focus:border-brown-600 mt-2 w-full rounded-lg border border-gray-400 bg-transparent px-3 py-2 text-gray-500 shadow-sm outline-none"
              disabled={loading}
            />
          </div>
          <div className="relative">
            <label className="font-medium">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="focus:border-brown-600 mt-2 w-full rounded-lg border border-gray-400 bg-transparent px-3 py-2 text-gray-500 shadow-sm outline-none"
              disabled={loading}
            />
            <div
              className="absolute inset-y-0 top-8 right-0 flex cursor-pointer items-center pr-3 text-sm leading-5"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <EyeIcon className="h-4 w-4 text-slate-600 dark:text-slate-300" />
              ) : (
                <EyeOffIcon className="h-4 w-4 text-slate-600 dark:text-slate-300" />
              )}
            </div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-x-3">
              <input
                type="checkbox"
                id="remember-me-checkbox"
                className="checkbox-item peer hidden"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                disabled={loading}
              />
              <label
                htmlFor="remember-me-checkbox"
                className="peer-checked:bg-brown-600 ring-brown-600 relative flex h-5 w-5 cursor-pointer rounded-md border border-slate-500 bg-white ring-offset-2 duration-150 peer-active:ring after:absolute after:inset-x-0 after:top-[3px] after:m-auto after:h-2.5 after:w-1.5 after:rotate-45 after:border-r-2 after:border-b-2 after:border-white"
              ></label>
              <span>Remember me</span>
            </div>
            {/* <a href="#" className="text-center text-brown-600 hover:text-brown-500">Forgot password?</a> */}
          </div>
          <button
            type="submit"
            className="bg-brown-600 hover:bg-brown-500 active:bg-brown-600 flex w-full items-center justify-center rounded-lg px-4 py-2 font-medium text-white duration-150"
            disabled={loading}
          >
            {loading ? (
              <div className="flex cursor-not-allowed gap-2">
                <svg
                  className="h-5 w-5 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>{" "}
                <span> Signing in...</span>{" "}
              </div>
            ) : (
              "Sign in"
            )}
          </button>
        </form>
        {error && <p className="text-center text-red-500">{error}</p>}
      </div>
    </div>
  );
}

export default LoginForm;
