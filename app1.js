const express = require('express');
const mongoose = require('mongoose');
const Student = require('./models/student');
const Course = require('./models/course');

const app = express();
app.use(express.json()); // For parsing JSON requests

// MongoDB connection string
const uri = "mongodb+srv://username:password21@cluster11.kcl10df.mongodb.net/";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.log(err));

// CRUD Routes

// 1. Create a new student
app.post('/students', async (req, res) => {
  const { name, email, age, enrolledCourses } = req.body;
  const newStudent = new Student({ name, email, age, enrolledCourses });
  try {
    const student = await newStudent.save();
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 2. Fetch all students
app.get('/students', async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

// 3. Fetch students with their enrolled courses (using $lookup)
app.get('/studentsWithCourses', async (req, res) => {
  const students = await Student.aggregate([
    {
      $lookup: {
        from: 'courses',
        localField: 'enrolledCourses',
        foreignField: '_id',
        as: 'courses'
      }
    }
  ]);
  res.json(students);
});

// 4. Update student information (e.g., add course)
app.put('/students/:id', async (req, res) => {
  const studentId = req.params.id;
  const { enrolledCourses } = req.body;
  try {
    const student = await Student.findById(studentId);
    student.enrolledCourses.push(...enrolledCourses);
    await student.save();
    res.json(student);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 5. Delete a student
app.delete('/students/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    res.json(student);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
