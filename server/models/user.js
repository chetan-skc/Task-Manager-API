const mongoose = require("mongoose");

// Subtask Schema: Represents individual subtasks of a task
const subtaskSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
  }, // Subtask subject/title
  deadline: {
    type: Date,
    required: true,
  }, // Subtask deadline
  status: {
    type: String,
    required: true,
  }, // Subtask status (e.g., pending, completed)
  deleted: {
    type: Boolean,
    default: false,
  }, // Soft delete flag for subtask
});

// Task Schema: Represents tasks that contain multiple subtasks
const taskSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
  }, // Task subject/title
  deadline: {
    type: Date,
    required: true,
  }, // Task deadline
  status: {
    type: String,
    required: true,
  }, // Task status (e.g., pending, completed)
  deleted: {
    type: Boolean,
    default: false,
  }, // Soft delete flag for task
  subtasks: [subtaskSchema], // Array of subtasks associated with the task
});

// User Schema: Represents users who have tasks
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  }, // User's name
  email: {
    type: String,
    required: true,
    unique: true,
  }, // User's email (must be unique)
  tasks: [taskSchema], // Array of tasks associated with the user
});

// Export the User model based on the userSchema
module.exports = mongoose.model("User", userSchema);
