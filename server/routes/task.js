const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

// Middleware to parse JSON bodies
router.use(express.json());

// Routes
router.get("/tasks/:username", taskController.getTasksByUsername);
router.post("/tasks", taskController.addTask);
router.put("/tasks/:taskId", taskController.updateTask);
router.delete("/tasks/:taskId", taskController.deleteTask);
router.get("/tasks/:taskId/subtasks", taskController.listSubtasks);
router.put("/tasks/:taskId/subtasks", taskController.updateTaskSubtasks);

module.exports = router;
