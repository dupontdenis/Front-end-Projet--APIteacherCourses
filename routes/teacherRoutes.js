import express from "express";
import {
  createTeacher,
  getTeachers,
  getTeacher,
  updateTeacher,
  deleteTeacher,
} from "../controllers/teacherController.js";
import { getCoursesByTeacher } from "../controllers/courseController.js";

const router = express.Router();

router.route("/").post(createTeacher).get(getTeachers);

router.get("/:id/courses", getCoursesByTeacher);

router.route("/:id").get(getTeacher).put(updateTeacher).delete(deleteTeacher);

export default router;
