import mongoose from "mongoose";
import { Teacher } from "./models/teacher.js";
import { Course } from "./models/courses.js";

const MONGO_URL =
  process.env.MONGO_URL || "mongodb://localhost:27017/apiCourses";

async function main() {
  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Connected to MongoDB:", MONGO_URL);

  // Remove all existing courses and teachers
  await Course.deleteMany({});
  await Teacher.deleteMany({});
  console.log("Cleared courses and teachers collections.");

  // Create some real teachers with birth/death dates
  const teachersData = [
    {
      name: "Teacher 1",
      dateOfBirth: "2000-01-01",
      dateOfDeath: "",
    },
    {
      name: "Teacher 2",
      dateOfBirth: "2000-01-01",
      dateOfDeath: "",
    },
  ];

  const teachers = await Teacher.insertMany(teachersData);
  console.log("Inserted teachers:", teachers.map((a) => a.name).join(", "));

  // Create courses that reference the teachers above
  const coursesData = [
    // Two courses by Jane Austen (same teachers array)
    {
      title: "HTML & CSS",
      teachers: [teachers[0]._id],
      summary:
        "An introductory course on building websites using HTML and CSS.",
    },

    // Two courses sharing the same multi-teacher set (Cormen/Leiserson/Rivest/Stein)
    {
      title: "Introduction to Algorithms",
      teachers: [teachers[0]._id, teachers[1]._id],
      summary:
        "Comprehensive introduction to algorithms and data structures, widely used as a textbook in computer science courses.",
    },
  ];

  const courses = await Course.insertMany(coursesData);
  console.log("Inserted courses:", courses.map((b) => b.title).join(", "));

  await mongoose.disconnect();
  console.log("Disconnected. Seed complete.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
