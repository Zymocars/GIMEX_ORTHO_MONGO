import React from "react";
import { useState } from "react";
import { Mail, Lock, EyeOff, Eye, Facebook, Twitter } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SignupPage from "./SignUp";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleForgetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/forgotpassword",
        {
          email,
        }
      );

      if (response.data.success) {
        alert("Password reset instructions have been sent to your email.");
        // const { token, data: user } = response.data;

        // localStorage.setItem("token", token);
        // localStorage.setItem("user", JSON.stringify(user));

        // console.log("Login successful:", user);

        // alert("For reset password, send to your email address");

        // if (user.isAdmin === true) {
        //   navigate("/admin/dashboard");
        // } else if (user.isAdmin === false) {
        //   navigate("/");
        // } else {
        //   alert("Unknown role: access denied ");
        // }
      } else {
        // console.error("Login failed:", response.data.message);
        alert(response.data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error during password reset:", error.response?.data || error.message);
      alert("Failed to send reset email. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-800">Welcome Back</h1>
          {/* <p className="text-sm text-gray-600">Log in to your account</p> */}
        </div>

        {/* Login Form */}
        <form onSubmit={handleForgetPassword} className="space-y-4">
          <div className="space-y-1">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <div className="relative">
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-10 py-2 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter your email"
                required
                autoComplete="email"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
