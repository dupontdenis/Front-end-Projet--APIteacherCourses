import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  summary: { type: String, default: "" },
  teachers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Teacher" }],
});

export const Course = mongoose.model("Course", courseSchema);
