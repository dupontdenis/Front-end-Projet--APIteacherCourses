import express from "express";
import {
  createCourse,
  getCourses,
  getCoursesByTeacher,
  getTeachersByCourse,
  getCourse,
  updateCourse,
  deleteCourse,
} from "../controllers/courseController.js";

const router = express.Router();

router.route("/").post(createCourse).get(getCourses);

router.get("/:id/teachers", getTeachersByCourse);

router.route("/:id").get(getCourse).put(updateCourse).delete(deleteCourse);

export default router;
