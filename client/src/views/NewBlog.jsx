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
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();


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

  
  const saveBlog = async () => {
    const token = localStorage.getItem("token");

    if (!token || !user) {
      toast.error("Session expired! Please login again.");
      setTimeout(() => navigate("/login"), 1500);
      return;
    }

    if (!title.trim() || !content.trim()) {
      toast.error("Please enter both title and content.");
      return;
    }

    setLoading(true);
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
        setTimeout(() => navigate("/"), 2000);
      }
    } catch (err) {
      console.error(err);
      toast.error(
        err?.response?.data?.message || "Error creating blog. Please try again."
      );
      if (err?.response?.status === 401) {
        localStorage.clear();
        setTimeout(() => navigate("/login"), 1500);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 text-gray-800">
      <div className="container mx-auto p-6">
        <Navbar />

        <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-sm shadow-xl border border-gray-200 rounded-2xl p-8 transition duration-300">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-8 text-center bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text">
            ✍️ Create a New Blog
          </h1>

          <input
            type="text"
            placeholder="Enter your blog title..."
            className="border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-300 p-4 w-full rounded-lg mb-5 bg-white text-gray-800 text-lg shadow-sm transition duration-200 outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-300 p-3 w-full rounded-lg mb-6 bg-white text-gray-800 text-md shadow-sm transition duration-200 outline-none"
          >
            {BLOG_CATEGORIES.map((cate) => (
              <option key={cate} value={cate}>
                {cate}
              </option>
            ))}
          </select>

          <div data-color-mode="light" className="rounded-lg overflow-hidden shadow-inner">
            <MarkdownEditor
              value={content}
              onChange={(value) => setContent(value)}
              height="400px"
            />
          </div>

          <div className="flex justify-end mt-6">
            <button
              className={`${
                loading ? "opacity-70 cursor-not-allowed" : ""
              } bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-lg shadow-lg transition duration-300 text-lg font-semibold`}
              type="button"
              onClick={saveBlog}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Blog"}
            </button>
          </div>
        </div>
        <Toaster />
      </div>

       <footer className="mt-16 text-center py-6 text-gray-600 text-sm">
        © {new Date().getFullYear()} <span className="font-semibold">BlogBits</span> — 
        Crafted with ❤️ for bloggers worldwide.
      </footer>
    </div>
  );
}

export default NewBlog;
