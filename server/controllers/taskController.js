const User = require("../models/user");
const { errorMessage, successMessage } = require("../utils/messages");

// Helper function to filter out deleted tasks and subtasks
const deletedDataFilter = (data) => {
  return data
    .filter((data) => !data.deleted)
    .map((data) => ({
      ...data._doc,
      subtasks: data.subtasks.filter((subtask) => !subtask.deleted),
    }));
};

// Get all tasks for a user
exports.getTasksByUsername = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ email: username }).exec();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const tasks = deletedDataFilter(user.tasks);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json(errorMessage(error.message));
  }
};

// Create a new task
exports.addTask = async (req, res) => {
  try {
    const { username, subject, deadline, status, subtasks = [] } = req.body;
    let user = await User.findOne({ email: username }).exec();

    if (!user) {
      user = new User({ email: username, name: "Default Name", tasks: [] });
    }

    const task = { subject, deadline, status, subtasks };
    user.tasks.push(task);
    await user.save();

    res.status(201).json(successMessage("Task created successfully"));
  } catch (error) {
    res.status(500).json(errorMessage(error.message));
  }
};

// Update an existing task
exports.updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { subject, deadline, status } = req.body;

    const user = await User.findOneAndUpdate(
      { "tasks._id": taskId },
      { $set: { "tasks.$": { subject, deadline, status } } },
      { new: true }
    ).exec();

    if (!user) {
      return res.status(404).json(errorMessage("Task not found"));
    }

    res.status(200).json(successMessage("Task updated successfully"));
  } catch (error) {
    res.status(500).json(errorMessage(error.message));
  }
};

// Soft delete a task
exports.deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const user = await User.findOneAndUpdate(
      { "tasks._id": taskId },
      { $set: { "tasks.$.deleted": true } },
      { new: true }
    ).exec();

    if (!user) {
      return res.status(404).json(errorMessage("Task not found"));
    }

    res.status(200).json(successMessage("Task successfully soft deleted"));
  } catch (error) {
    res.status(500).json(errorMessage(error.message));
  }
};

// Get all subtasks for a task
exports.listSubtasks = async (req, res) => {
  try {
    const { taskId } = req.params;
    const user = await User.findOne({ "tasks._id": taskId }).exec();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const task = user.tasks.id(taskId);
    if (!task) {
      return res.status(404).json(errorMessage("Task not found"));
    }

    res.status(200).json(successMessage("Subtasks retrieved successfully"));
  } catch (error) {
    res.status(500).json(errorMessage(error.message));
  }
};

// Update multiple subtasks for a task
exports.updateTaskSubtasks = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { subtasks } = req.body;

    const user = await User.findOne({ "tasks._id": taskId }).exec();

    if (!user) {
      return res.status(404).json(errorMessage("User not found"));
    }

    const task = user.tasks.id(taskId);
    if (!task) {
      return res.status(404).json(errorMessage("Task not found"));
    }

    subtasks.forEach((subtask) => {
      const existingSubtask = task.subtasks.id(subtask._id);
      if (existingSubtask) {
        Object.assign(existingSubtask, subtask);
      } else {
        task.subtasks.push(subtask);
      }
    });

    await user.save();
    res.status(200).json(successMessage("Subtasks updated successfully"));
  } catch (error) {
    res.status(500).json(errorMessage(error.message));
  }
};
