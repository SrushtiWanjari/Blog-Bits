import { Link } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";

function BlogCard({
  title,
  author,
  publishedAt,
  updatedAt,
  status,
  category,
  slug,
  viewCount,
  onDelete, // ✅ refresh callback from parent (AllBlogs)
}) {
  const [isDeleting, setIsDeleting] = useState(false);

  // 🔥 Confirmation Toast UI
  const confirmDeleteToast = () => {
    toast.dismiss();

    toast.info(
      <div className="flex flex-col items-center text-center gap-3 px-5 py-4">
        <p className="font-semibold text-gray-800 text-base">
          Are you sure you want to delete{" "}
          <span className="text-purple-600 font-bold">"{title}"</span>?
        </p>
        <div className="flex justify-center gap-3 mt-1">
          <button
            onClick={() => {
              toast.dismiss();
              handleDelete(true);
            }}
            className="bg-gradient-to-r from-red-500 to-pink-600 text-white text-sm font-medium px-5 py-2 rounded-lg shadow-md hover:from-red-600 hover:to-pink-700 hover:shadow-lg transition-all duration-300"
          >
            Yes, Delete
          </button>
          <button
            onClick={() => toast.dismiss()}
            className="bg-gray-200 text-gray-700 text-sm font-medium px-5 py-2 rounded-lg hover:bg-gray-300 hover:shadow transition-all duration-300"
          >
            Cancel
          </button>
        </div>
      </div>,
      {
        autoClose: false,
        closeOnClick: false,
        position: "top-center",
        className:
          "!bg-white !rounded-2xl !shadow-2xl !border !border-gray-200 !backdrop-blur-sm",
      }
    );
  };

  // 🗑️ Handle actual deletion
  const handleDelete = async (confirmed = false) => {
    if (!confirmed) return confirmDeleteToast();

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("⚠️ You must be logged in to delete a blog.");
        return;
      }

      setIsDeleting(true);

      // ✅ Send delete request
      await axios.delete(`${import.meta.env.VITE_API_URL}/blogs/${slug}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("🗑️ Blog deleted successfully!", {
        position: "bottom-right",
        className:
          "!bg-gradient-to-r !from-green-500 !to-emerald-600 !text-white !font-medium !rounded-xl",
      });

      // ✅ Smooth refresh
      setTimeout(() => {
        if (onDelete) onDelete();
      }, 400);
    } catch (error) {
      console.error("Delete failed:", error);
      setIsDeleting(false);
      toast.error("❌ Failed to delete blog. Try again!");
    }
  };

  return (
    <div
      className={`relative bg-gradient-to-br from-white via-purple-50 to-blue-50 border border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] overflow-hidden group ${
        isDeleting
          ? "opacity-0 scale-95 pointer-events-none transition-all duration-500"
          : ""
      }`}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100/40 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 rounded-2xl"></div>

      {/* Category Badge */}
      <span className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
        {category}
      </span>

      {/* Title */}
      <h2 className="text-2xl font-bold mb-3 text-gray-800 leading-tight hover:text-purple-600 transition-colors duration-300 z-10 relative">
        {status !== "published" && (
          <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-1 rounded-md mr-2 uppercase">
            {status}
          </span>
        )}
        {title}
      </h2>

      {/* Author Info */}
      <div className="flex items-center gap-4 mb-4 z-10 relative">
        <div className="flex items-center justify-center w-[55px] h-[55px] bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full font-bold text-2xl shadow-inner">
          {author.name.substring(0, 1).toUpperCase()}
        </div>
        <div>
          <p className="font-semibold text-gray-900">{author.name}</p>
          <p className="text-gray-500 text-sm">{author.email}</p>
        </div>
      </div>

      {/* Blog Details */}
      <div className="text-gray-600 text-sm mb-4 z-10 relative">
        <p>
          📅{" "}
          <span className="font-medium text-gray-700">
            {new Date(publishedAt || updatedAt).toLocaleString()}
          </span>
        </p>
        <p>
          👁️ Read by <span className="font-semibold">{viewCount}</span> people
        </p>
      </div>

      {/* Divider */}
      <div className="h-[1px] bg-gradient-to-r from-transparent via-purple-300 to-transparent mb-4" />

      {/* Buttons */}
      <div className="flex justify-between items-center z-10 relative">
        {status === "published" ? (
          <Link
            to={`/blog/${slug}`}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold px-5 py-2 rounded-lg shadow-md hover:shadow-lg hover:from-purple-700 hover:to-blue-700 transition duration-300"
          >
            Read More →
          </Link>
        ) : (
          <Link
            to={`/edit/${slug}`}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold px-5 py-2 rounded-lg shadow-md hover:shadow-lg hover:from-purple-700 hover:to-blue-700 transition duration-300"
          >
            ✏️ Edit Blog
          </Link>
        )}

        {/* ✅ Delete Button */}
        <button
          onClick={() => !isDeleting && handleDelete(false)}
          disabled={isDeleting}
          className="bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold px-5 py-2 rounded-lg shadow-md hover:shadow-lg hover:from-red-600 hover:to-pink-700 transition duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
}

export default BlogCard;
