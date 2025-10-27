import MarkdownEditor from "@uiw/react-md-editor";
import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router";
import Navbar from "../components/Navbar.jsx";
import { BLOG_CATEGORIES } from "./../constants.js";

function EditBlog() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(BLOG_CATEGORIES[0]);
  const { slug } = useParams();

  const loadBlog = async () => {
    if (!slug) return;
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/blogs/${slug}`);
    const blogData = response?.data?.data;
    setTitle(blogData?.title);
    setContent(blogData?.content);
    setCategory(blogData?.category);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-color-mode", "light");
    loadBlog();
  }, []);

  const updateBlog = async () => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/blogs/${slug}`,
        { title, content, category },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      if (response?.data?.success) {
        toast.success("Blog saved successfully");
        setTimeout(() => (window.location.href = "/"), 2000);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Error updating blog");
    }
  };

  const publishBlog = async () => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/blogs/${slug}/publish`,
        {},
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      if (response?.data?.success) {
        toast.success("Blog published successfully");
        setTimeout(() => (window.location.href = "/"), 2000);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Error publishing blog");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen text-gray-800">
      <div className="container mx-auto p-6">
        <Navbar />
        <h1 className="text-4xl font-bold text-purple-600 mb-6">Edit Blog</h1>

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

        <div className="flex gap-4">
          <button
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 mt-4 rounded transition"
            onClick={updateBlog}
          >
            Save
          </button>
          <button
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 mt-4 rounded transition"
            onClick={publishBlog}
          >
            Publish
          </button>
        </div>

        <Toaster />
      </div>
    </div>
  );
}

export default EditBlog;

