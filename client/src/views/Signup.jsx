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
    <div className="bg-gray-50 min-h-screen flex items-center justify-center text-gray-800">
     

      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
         <h1 className="text-3xl font-bold mb-6 text-purple-600 text-center">Signup</h1>
        <input
          type="text" 
          placeholder="Name"
          className="border border-gray-300 rounded p-2 w-full mb-4 bg-white text-gray-800"
          value={user.name}
          onChange={(e) => {
            setUser({ ...user, name: e.target.value });
          }}
        />
        <input
          type="email"
          placeholder="Email"
          className="border border-gray-300 rounded p-2 w-full mb-4 bg-white text-gray-800"
          value={user.email}
          onChange={(e) => {
            setUser({ ...user, email: e.target.value });
          }}
        />
        <input
          type="password"
          placeholder="Password"
          className="border border-gray-300 rounded p-2 w-full mb-4 bg-white text-gray-800"
          value={user.password}
          onChange={(e) => {
            setUser({ ...user, password: e.target.value });
          }}
        />
        <button
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded w-full"
          type="button"
          onClick={signupUser}
        >
          Signup
        </button>

        <p className="mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
