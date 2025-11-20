import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import teacherRoutes from "./routes/teacherRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";

const app = express();
app.use(express.json());
// Enable CORS for all origins (allows requests from any domain)
// Explicitly allow common methods and headers to avoid client issues.
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

mongoose.connect("mongodb://localhost:27017/apiCourses");

// Serve frontend static files from the `public` directory
app.use(express.static("public"));

// Mount new paths
app.use("/teachers", teacherRoutes);
app.use("/courses", courseRoutes);

// Backwards-compatibility: also mount the same routers on the original paths
// so existing clients using `/authors` or `/books` continue to work.
app.use("/authors", teacherRoutes);
app.use("/books", courseRoutes);

// Static file redirects for old frontend filenames -> new filenames
// This preserves links/bookmarks to `/author.html` and `/book.html`.
app.get("/author.html", (req, res) => res.redirect(301, "/teacher.html"));
app.get("/book.html", (req, res) => res.redirect(301, "/course.html"));

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
