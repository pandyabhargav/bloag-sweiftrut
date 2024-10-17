import express from "express";
import {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../controller/blogcontroller.js";

const router = express.Router();

// Get all blogs
router.get("/", getAllBlogs);

// Get blog by ID
router.get("/:id", getBlogById);

// Create a new blog
router.post("/addForm", createBlog); // POST to /add

// Update a blog
router.put("/updateForm/:id", updateBlog);

// Delete a blog
router.delete("/delete/:id", deleteBlog);

export default router;
