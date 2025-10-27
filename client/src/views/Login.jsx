import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import toast, { Toaster } from "react-hot-toast";

function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const loginUser = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/login`,
        user
      );

      if (response?.data?.success) {
        toast.success("✅ Login successful!");

        localStorage.setItem("loggedInUser", JSON.stringify(response.data.user));
        localStorage.setItem("token", response?.data?.token);

        setTimeout(() => navigate("/"), 1500);
      } else {
        toast.error(response?.data?.message || "Invalid credentials");
      }
    } catch (error) {
      toast.error("❌ Something went wrong. Try again!");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-blue-50 to-pink-100 text-gray-800">
      <div className="bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl px-8 py-10 w-full max-w-md border border-gray-200 transition-all duration-300 hover:shadow-purple-300">
        <h1 className="text-4xl font-extrabold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600">
          Welcome Back 👋
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Log in to continue to your dashboard
        </p>

        {/* Email Input */}
        <div className="relative mb-5">
          <input
            type="email"
            placeholder="Enter your email"
            className="peer border-2 border-gray-200 rounded-xl p-4 w-full bg-white/70 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:ring focus:ring-purple-100 transition-all duration-300"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <span className="absolute right-4 top-4 text-purple-400 peer-focus:text-purple-600 transition-colors">
            📧
          </span>
        </div>

        {/* Password Input */}
        <div className="relative mb-6">
          <input
            type="password"
            placeholder="Enter your password"
            className="peer border-2 border-gray-200 rounded-xl p-4 w-full bg-white/70 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:ring focus:ring-purple-100 transition-all duration-300"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <span className="absolute right-4 top-4 text-purple-400 peer-focus:text-purple-600 transition-colors">
            🔒
          </span>
        </div>

        {/* Login Button */}
        <button
          type="button"
          onClick={loginUser}
          className="w-full bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
        >
          🚀 Login
        </button>

        <p className="text-center text-gray-600 mt-6">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-purple-600 font-medium hover:underline hover:text-purple-800 transition-all duration-200"
          >
            Sign up here
          </Link>
        </p>

        <div className="text-center mt-4 text-sm text-gray-400">
          <Link
            to="/forgot-password"
            className="hover:text-purple-500 transition-all"
          >
            Forgot Password?
          </Link>
        </div>
      </div>

      <Toaster position="bottom-right" />
    </div>
  );
}

export default Login;
