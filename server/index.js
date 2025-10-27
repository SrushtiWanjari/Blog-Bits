import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import jwtCheck from "./middleware/jwtCheck.js";
import { postSignup, postLogin } from "./controllers/user.js";
import Blog from "./models/Blog.js";
import {
  getBlogForSlug,
  getBlogs,
  patchPublishBlog,
  postBlogs,
  putBlogs,
} from "./controllers/blog.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    if (conn) {
      console.log("Mongodb Connected");
    }
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API is running...",
  });
});

const increaseViewCount = async (req, res, next) => {
  const { slug } = req.params;

  try {
    const blog = await Blog.findOne({ slug });
    if (blog) {
      blog.viewCount += 1;
      await blog.save();
    }
  } catch (error) {
    console.error("Error increasing view count:", error);
  }

  next();
};

app.post("/signup", postSignup);
app.post("/login", postLogin);
app.get("/blogs", getBlogs);
app.get("/blogs/:slug", increaseViewCount, getBlogForSlug);

app.post("/blogs", jwtCheck, postBlogs);
app.patch("/blogs/:slug/publish", jwtCheck, patchPublishBlog);
app.put("/blogs/:slug", jwtCheck, putBlogs);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
