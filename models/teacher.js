import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dateOfBirth: { type: Date },
  dateOfDeath: { type: Date, default: null },
});

export const Teacher = mongoose.model("Teacher", teacherSchema);
