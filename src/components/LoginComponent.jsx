import React, { useState } from "react";
import { LoginAPI } from "../api/AuthAPI";
import LinkedinLogo from "../assets/linkedinLogo.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function LoginComponent() {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({});
  const [loading, setLoading] = useState(false);

  const login = async () => {
    try {
      setLoading(true);

      if (!credentials.email || !credentials.password) {
        toast.error("Please enter email and password");
        setLoading(false);
        return;
      }

      const response = await LoginAPI(credentials.email, credentials.password);
      toast.success("Signed In Successfully!");

      // Navigate based on role
      if (response.role === "admin") {
        navigate("/admin");
      } else if (response.role === "company") {
        navigate("/company");
      } else {
        navigate("/home");
      }

      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error(err.message || "Please Check your Credentials");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-['Inter']">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-12 w-auto"
          src={LinkedinLogo}
          alt="LinkedIn"
        />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your professional world
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-lg sm:px-10 border border-gray-100">
          <div className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="Ex: user@example.com"
                  className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-[#0077b5] focus:border-transparent transition-all"
                  onChange={(event) =>
                    setCredentials({ ...credentials, email: event.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder="Password"
                  className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-[#0077b5] focus:border-transparent transition-all"
                  onChange={(event) =>
                    setCredentials({ ...credentials, password: event.target.value })
                  }
                  onKeyPress={(event) => {
                    if (event.key === "Enter") {
                      login();
                    }
                  }}
                />
              </div>
            </div>

            <div className="text-xs text-gray-500">
              <a href="#" className="text-[#0077b5] hover:underline">
                Forgot password?
              </a>
            </div>

            <div>
              <button
                onClick={login}
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-[#0077b5] hover:bg-[#006097] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0077b5] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </div>
          </div>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  New to LinkedIn?
                </span>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={() => navigate("/register")}
                className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-full shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0077b5] transition-colors duration-200"
              >
                Join now
              </button>
            </div>
          </div>

          {/* Admin Login Hint */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-400">
              Admin access: jobgate@gmail.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
