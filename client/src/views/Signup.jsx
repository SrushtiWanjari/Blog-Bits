import axios from "axios";
import { useState } from "react";
import { Link } from "react-router";
import toast from "react-hot-toast";

function Signup() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const signupUser = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/signup`,
        user
      );

      if (response?.data?.success) {
        toast.success("Signup successful! Please log in.");
        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
      } else {
        toast.error(response?.data?.message || "Signup failed");
      }
    } catch (error) {
      toast.error("Something went wrong. Try again!");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 via-pink-400 to-blue-400 text-gray-800 px-4">
      <div className="backdrop-blur-lg bg-white/30 shadow-2xl rounded-2xl p-8 w-full max-w-md border border-white/40">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-white drop-shadow-lg">
          Create an Account
        </h1>

        <div className="space-y-5">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 rounded-lg bg-white/80 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500 transition-all duration-200"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />

          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-3 rounded-lg bg-white/80 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500 transition-all duration-200"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg bg-white/80 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500 transition-all duration-200"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />

          <button
            type="button"
            onClick={signupUser}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
          >
            Sign Up
          </button>
        </div>

        <p className="mt-8 text-center text-white/90 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-yellow-200 font-semibold hover:underline hover:text-yellow-100 transition"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
