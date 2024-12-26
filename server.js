const express = require("express");
const dotEnv = require("dotenv");
const { MongoClient } = require("mongodb");
const { mongoose } = require("mongoose");
const cors = require("cors");

dotEnv.config();
const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server started and running at ${PORT}`);
});

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log(`Mongodb Connect Successfully`);
    })
    .catch((err) => {
        console.log(`Error: ${err}`);
    });

const taskSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    dueDate: { type: Date, required: true },
    status: {
        type: String,
        enum: ["Pending", "In Progress", "Completed"],
        default: "Pending",
    },
    priority: {
        type: String,
        enum: ["Low", "Medium", "High"], // Priority must be one of these values
        required: true, // Priority is required
    },
});

// Create a Mongoose model for the Task schema
const Task = mongoose.model("Task", taskSchema);

// Define API endpoint to create a new task
app.post("/tasks", async (req, res) => {
    try {
        const task = new Task(req.body);
        const savedTask = await task.save();
        res.status(201).json(savedTask);
    } catch (err) {
        console.error("Error creating task:", err.message);
        res.status(400).json({ error: err.message });
    }
});

// Define API endpoint to retrieve search tasks
app.get("/searchtasks", async (req, res) => {
    try {
        const { query } = req.query;

        if (!query) {
            return res.status(400).json({ error: "Search query is required" });
        }
        const tasks = await Task.find({
            $or: [
                { name: { $regex: query, $options: "i" } },
                { status: { $regex: query, $options: "i" } },
            ],
        });

        res.status(200).json(tasks);
    } catch (err) {
        console.error("Error retrieving tasks:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Define API endpoint to retrieve all tasks
app.get("/tasks/", async (req, res) => {
    try {
        const task = await Task.find();
        res.status(200).json(task);
    } catch (err) {
        console.error("Error retrieving task:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Define API endpoint to retrieve a single task by ID
app.get("/tasks/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const cleanedId = id.replace(":", "");
        console.log(id);
        console.log(cleanedId);
        const task = await Task.findById(cleanedId);
        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }
        res.status(200).json(task);
    } catch (err) {
        console.error("Error retrieving task:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Define API endpoint to update an existing task
app.patch("/tasks/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const cleanedId = id.replace(":", "");

        const updatedTask = await Task.findByIdAndUpdate(cleanedId, req.body, {
            new: true,
            runValidators: true,
        });

        if (!updatedTask) {
            return res.status(404).json({ error: "Task not found" });
        }
        res.status(200).json({
            message: "Task updated successfully",
            updatedTask,
        });
    } catch (err) {
        console.error("Error updating task:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Define API endpoint to delete a task
app.delete("/tasks/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const cleanedId = id.replace(":", "");

        const deletedTask = await Task.findByIdAndDelete(cleanedId);
        if (!deletedTask) {
            return res.status(404).json({ error: "Task not found" });
        }
        res.status(200).json({
            message: "Task deleted successfully",
            deletedTask,
        });
    } catch (err) {
        console.error("Error deleting task:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
