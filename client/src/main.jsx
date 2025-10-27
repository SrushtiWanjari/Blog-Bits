import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";
import AllBlogs from "./views/AllBlogs.jsx";
import NewBlog from "./views/NewBlog.jsx";
import EditBlog from "./views/EditBlog.jsx";
import ReadBlog from "./views/ReadBlog.jsx";
import Signup from "./views/Signup.jsx";
import Login from "./views/Login.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<AllBlogs />} />
      <Route path="/new" element={<NewBlog />} />
      <Route path="/edit/:id" element={<EditBlog />} />
      <Route path="/blog/:slug" element={<ReadBlog />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/Login" element={<Login/>} />
      <Route
        path="*"
        element={<h1 className="text-center mt-5">404 Not Found</h1>}
      />
    </Routes>
  </BrowserRouter>
);
