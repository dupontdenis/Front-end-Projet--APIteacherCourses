import { Teacher } from "../models/teacher.js";

export async function createTeacher(req, res) {
  try {
    const teacher = new Teacher({
      name: req.body.name,
      dateOfBirth: req.body.dateOfBirth,
      dateOfDeath: req.body.dateOfDeath,
    });
    const saved = await teacher.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function getTeachers(req, res) {
  const teachers = await Teacher.find();
  res.json(teachers);
}

export async function getTeacher(req, res) {
  const teacher = await Teacher.findById(req.params.id);
  res.json(teacher);
}

export async function updateTeacher(req, res) {
  const updated = await Teacher.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      dateOfBirth: req.body.dateOfBirth,
      dateOfDeath: req.body.dateOfDeath,
    },
    { new: true }
  );
  res.json(updated);
}

export async function deleteTeacher(req, res) {
  await Teacher.findByIdAndDelete(req.params.id);
  res.status(204).end();
}
