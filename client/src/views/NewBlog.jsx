import MarkdownEditor from "@uiw/react-md-editor";
import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar.jsx";
import { BLOG_CATEGORIES } from "./../constants.js";
import { getCurrentUser } from "./../util.js";
import { useNavigate } from "react-router";

function NewBlog() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(BLOG_CATEGORIES[0]);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  // Check user and token on mount
  useEffect(() => {
    document.documentElement.setAttribute("data-color-mode", "light");
    const currentUser = getCurrentUser();
    const token = localStorage.getItem("token");

    if (!currentUser || !token) {
      toast.error("You must be logged in to create a blog!");
      setTimeout(() => navigate("/login"), 1500);
      return;
    }

    setUser(currentUser);
  }, []);

  // Save Blog
  // const saveBlog = async () => {
  //   const token = localStorage.getItem("token");
  //   if (!token || !user) {
  //     toast.error("Session expired! Please login again.");
  //     setTimeout(() => navigate("/login"), 1500);
  //     return;
  //   }

  //   try {
  //     const response = await axios.post(
  //       `${import.meta.env.VITE_API_URL}/blogs`,
  //       {
  //         title,
  //         content,
  //         category,
  //         author: user._id,
  //       },
  //       {
  //         headers: { Authorization: `Bearer ${token}` },
  //       }
  //     );

  //     if (response?.data?.success) {
  //       toast.success("Blog saved successfully!");
  //       setTimeout(() => navigate("/allblogs"), 2000);
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     toast.error(
  //       err?.response?.data?.message || "Error creating blog. Please try again."
  //     );
  //     if (err?.response?.status === 401) {
  //       localStorage.clear();
  //       setTimeout(() => navigate("/login"), 1500);
  //     }
  //   }
  // };


  const saveBlog = async () => {
  const token = localStorage.getItem("token");

  if (!token || !user) {
    toast.error("Session expired! Please login again.");
    setTimeout(() => navigate("/login"), 1500);
    return;
  }

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/blogs`,
      {
        title,
        content,
        category,
        author: user._id,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (response?.data?.success) {
      toast.success("Blog saved successfully!");

      // ⏳ Give the user 1.5–2 seconds to see the toast, then redirect
      setTimeout(() => {
        navigate("/"); // ✅ Redirect to All Blogs page
      }, 2000);
    }
  } catch (err) {
    console.error(err);

    toast.error(
      err?.response?.data?.message || "Error creating blog. Please try again."
    );

    // If unauthorized, clear session and redirect to login
    if (err?.response?.status === 401) {
      localStorage.clear();
      setTimeout(() => navigate("/login"), 1500);
    }
  }
};


  return (
    <div className="bg-gray-50 min-h-screen text-gray-800">
      <div className="container mx-auto p-6">
        <Navbar />
        <h1 className="text-4xl font-bold mb-6 text-purple-600">Create New Blog</h1>

        <input
          type="text"
          placeholder="Blog Title"
          className="border border-gray-300 p-3 w-full rounded mb-4 bg-white text-gray-800"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-300 p-3 w-full rounded mb-4 bg-white text-gray-800"
        >
          {BLOG_CATEGORIES.map((cate) => (
            <option key={cate} value={cate}>
              {cate}
            </option>
          ))}
        </select>

        <MarkdownEditor
          value={content}
          onChange={(value) => setContent(value)}
          height="400px"
        />

        <button
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 mt-4 rounded transition"
          type="button"
          onClick={saveBlog}
        >
          Save Blog
        </button>

        <Toaster />
      </div>
    </div>
  );
}

export default NewBlog;
