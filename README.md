# Task Management API

A simple API for managing tasks, built using Express.js, MongoDB, and Mongoose.

## Table of Contents

-   [Technologies](#technologies)
-   [Setup](#setup)
-   [API Endpoints](#api-endpoints)
    -   [Create a Task](#create-a-task)
    -   [Search Tasks](#search-tasks)
    -   [Get All Tasks](#get-all-tasks)
    -   [Get Task by ID](#get-task-by-id)
    -   [Update a Task](#update-a-task)
    -   [Delete a Task](#delete-a-task)
-   [Environment Variables](#environment-variables)

## Technologies

-   Node.js
-   Express.js
-   MongoDB
-   Mongoose
-   CORS

## Setup

1. Clone the repository:
    ```bash
    git clone <repository-url>
    cd <project-folder>
    Install dependencies:
    ```

bash
Copy code
npm install
Create a .env file in the root directory and add the following variables:

env
Copy code
PORT=your_port
MONGO_URI=your_mongo_connection_string
Start the server:

bash
Copy code
npm start
The API will be running at http://localhost:<PORT>.

API Endpoints
Create a Task
POST /tasks

Create a new task.

Request Body:

json
Copy code
{
"name": "Task Name",
"description": "Task Description",
"dueDate": "2024-12-31",
"status": "Pending",
"priority": "High"
}
Response:

json
Copy code
{
"\_id": "task_id",
"name": "Task Name",
"description": "Task Description",
"dueDate": "2024-12-31",
"status": "Pending",
"priority": "High"
}
Search Tasks
GET /searchtasks?query=<search-query>

Search for tasks by name or status.

Query Parameters:

query: The search query.
Response:

json
Copy code
[
{
"_id": "task_id",
"name": "Task Name",
"description": "Task Description",
"dueDate": "2024-12-31",
"status": "Pending",
"priority": "High"
}
]
Get All Tasks
GET /tasks

Retrieve all tasks.

Response:

json
Copy code
[
{
"_id": "task_id",
"name": "Task Name",
"description": "Task Description",
"dueDate": "2024-12-31",
"status": "Pending",
"priority": "High"
}
]
Get Task by ID
GET /tasks/:id

Retrieve a task by its ID.

Response:

json
Copy code
{
"\_id": "task_id",
"name": "Task Name",
"description": "Task Description",
"dueDate": "2024-12-31",
"status": "Pending",
"priority": "High"
}
Update a Task
PATCH /tasks/:id

Update an existing task by its ID.

Request Body:

json
Copy code
{
"status": "Completed"
}
Response:

json
Copy code
{
"message": "Task updated successfully",
"updatedTask": {
"\_id": "task_id",
"name": "Task Name",
"description": "Task Description",
"dueDate": "2024-12-31",
"status": "Completed",
"priority": "High"
}
}
Delete a Task
DELETE /tasks/:id

Delete a task by its ID.

Response:

json
Copy code
{
"message": "Task deleted successfully",
"deletedTask": {
"\_id": "task_id",
"name": "Task Name",
"description": "Task Description",
"dueDate": "2024-12-31",
"status": "Pending",
"priority": "High"
}
}
Environment Variables
PORT: The port the server should run on.
MONGO_URI: The connection string for your MongoDB database.
License
This project is licensed under the MIT License.
