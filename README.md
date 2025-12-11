# APICoursesTeachers

## Overview

This repository provides a small REST API to manage teachers and courses (Node.js, Express, Mongoose). This README explains how to run the API, seed example data, and the available endpoints with examples.

## How to retrieve all courses for a given teacher

To get all courses taught by a specific teacher, query the `Course` collection for documents where the `teachers` array contains the teacher's `_id`:

```js
// In a controller or route:
const courses = await Course.find({ teachers: teacherId });
```

## Run locally

Install dependencies and start the server:

```bash
npm install
# Seed the database (this will erase teachers and courses):
npm run seed
# Start the server:
npm start
```

### Prerequisites

- Node.js installed (recommended LTS version).
- MongoDB must be installed and running locally, or reachable via the `MONGO_URL` environment variable. You can run MongoDB quickly with Docker:

```bash
docker run --name mongo -p 27017:27017 -d mongo:latest
```

Make sure the database is reachable at `mongodb://localhost:27017/apiCourses` (or set `MONGO_URL` accordingly) before running the seed or starting the server.

For development with auto-restart use:

```bash
npm run dev
```

## Seeded data

Running `npm run seed` inserts example teachers and courses into the database. The seeder adds these teachers:

- Alice Smith
- Bob Johnson
- Claire Martin

To see the seeded teachers and their `_id` values:

```
GET http://localhost:3000/teachers
```

Copy a teacher's `_id` to use when creating courses.

## API Endpoints

Base URL: `http://localhost:3000`

Teachers

- Create a teacher

  POST /teachers
  Content-Type: application/json

  Body example:

  ```json
  {
    "name": "Alice Example",
    "email": "alice@example.com",
    "department": "Mathematics"
  }
  ```

- List teachers

  GET /teachers

- Get teacher by id

  GET /teachers/:id

- Update teacher

  PUT /teachers/:id
  Content-Type: application/json

  Body example:

  ```json
  {
    "name": "Alice Updated",
    "email": "alice@example.com",
    "department": "Mathematics"
  }
  ```

- Delete teacher

  DELETE /teachers/:id

Courses

- Create a course (use existing teacher ids)

  POST /courses
  Content-Type: application/json

  Body example (single teacher):

  ```json
  {
    "title": "Intro to Algebra",
    "teachers": ["<TEACHER_ID>"]
  }
  ```

  Body example (multiple teachers):

  ```json
  {
    "title": "Advanced Topics (Team-taught)",
    "teachers": ["<TEACHER_ID_1>", "<TEACHER_ID_2>"]
  }
  ```

- List courses

  GET /courses

- Get course by id

  GET /courses/:id

- Update course

  PUT /courses/:id
  Content-Type: application/json

  Body example:

  ```json
  {
    "title": "Intro to Algebra (Updated)",
    "teachers": ["<TEACHER_ID>"]
  }
  ```

- Delete course

  DELETE /courses/:id

## Using seeded IDs in requests

1. Run the seeder: `npm run seed`.
2. Get teachers: `GET /teachers` and copy an `_id` value.
3. Use that `_id` in the `teachers` array when creating a course.

## Notes

- The `teachers` field on a `Course` document stores ObjectId references to `Teacher` documents. The API returns raw references by default. If you need populated teacher objects, you can populate them in the controller or add a query option to return populated results.
- The seeder will erase the `teachers` and `courses` collections — do not run it in production.

---

If you'd like, I can add: a) example responses for each endpoint, b) a short Postman collection, or c) auto-fill the `api-requests.http` placeholders with IDs produced by the seeder.

## Frontend tester

A minimal static frontend is included to quickly test the `GET /teachers` and `GET /courses` endpoints.

- Open the app at: `http://localhost:3000/` after starting the server.
- Click **Load Teachers** to fetch `GET /teachers` and show teachers.
- Click **Load Courses** to fetch `GET /courses` and show courses (populated teachers shown when available).

The frontend files are in the `public/` folder: `index.html`, `main.js`, and `style.css`.
