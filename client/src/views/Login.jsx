import axios from "axios";
import { useState } from "react";
import { Link } from "react-router";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

function Login() {
  const navigate = useNavigate()
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

      console.log(response?.data);
      

      if (response?.data?.success) {
        toast.success("Login successful!");

        localStorage.setItem(
          "loggedInUser",
          JSON.stringify(response.data.user)
        );

        console.log("token", response?.data?.token)
        localStorage.setItem("token", response?.data?.token);

        setTimeout(() => {
          navigate("/")
          // window.location.href = "/";
        }, 1500);
      } else {
        toast.error(response?.data?.message || "Invalid credentials");
      }
    } catch (error) {
      toast.error("Something went wrong. Try again!");
      console.error(error);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center text-gray-800">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-purple-600 text-center">
          Login
        </h1>
        <input
          type="email"
          placeholder="Email"
          className="border border-gray-300 rounded p-2 w-full mb-4 bg-white text-gray-800"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="border border-gray-300 rounded p-2 w-full mb-4 bg-white text-gray-800"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded w-full"
          onClick={loginUser}
          type="button"
        >
          Login
        </button>

        <p className="mt-6">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 underline">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
