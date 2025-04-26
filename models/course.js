const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  courseName: { type: String, required: true },
  instructor: { type: String, required: true },
  credits: { type: Number, required: true }
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
