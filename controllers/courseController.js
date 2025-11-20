import { Course } from "../models/courses.js";
import { Teacher } from "../models/teacher.js";

export async function createCourse(req, res) {
  try {
    const course = new Course({
      title: req.body.title,
      teachers: req.body.teachers,
      summary: req.body.summary,
    });
    const saved = await course.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function getCourses(req, res) {
  if (req.query && req.query.teacher) {
    const courses = await Course.find({ teachers: req.query.teacher });
    return res.json(courses);
  }

  const courses = await Course.find().populate("teachers");
  res.json(courses);
}

export async function getCoursesByTeacher(req, res) {
  const teacherId = req.params.teacherId || req.params.id;
  if (!teacherId)
    return res.status(400).json({ error: "teacher id is required" });
  const courses = await Course.find({ teachers: teacherId });
  res.json(courses);
}

export async function getTeachersByCourse(req, res) {
  const courseId = req.params.id;
  if (!courseId)
    return res.status(400).json({ error: "course id is required" });

  const course = await Course.findById(courseId);
  if (!course) return res.status(404).json({ error: "course not found" });

  const teacherIds = Array.isArray(course.teachers) ? course.teachers : [];
  const teachers = await Teacher.find({ _id: { $in: teacherIds } });
  res.json(teachers);
}

export async function getCourse(req, res) {
  const course = await Course.findById(req.params.id).populate("teachers");
  res.json(course);
}

export async function updateCourse(req, res) {
  const updated = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  }).populate("teachers");

  res.json(updated);
}

export async function deleteCourse(req, res) {
  await Course.findByIdAndDelete(req.params.id);
  res.status(204).end();
}
