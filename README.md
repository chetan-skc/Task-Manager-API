# Task Manager API

This backend API, built with Express.js and MongoDB, facilitates the management of tasks and subtasks for users within an application. The API supports CRUD operations (Create, Retrieve, Update, Delete) on tasks and their associated subtasks. Deleted tasks or subtasks are excluded from GET API responses without affecting CRUD operations and without being permanently removed.

## Database Schema Documentation

### User Collection

**Schema:**

| Field   | Type       | Required | Description                                 |
| ------- | ---------- | -------- | ------------------------------------------- |
| `_id`   | `ObjectId` | `true`   | Unique identifier for the user.             |
| `name`  | `String`   | `true`   | The name of the user.                       |
| `email` | `String`   | `true`   | The email address of the user.              |
| `tasks` | `Array`    | `false`  | An array of tasks associated with the user. |

### Task Collection

**Schema:**

| Field      | Type       | Required | Description                                                |
| ---------- | ---------- | -------- | ---------------------------------------------------------- |
| `_id`      | `ObjectId` | `true`   | Unique identifier for the task.                            |
| `subject`  | `String`   | `true`   | The subject or title of the task.                          |
| `deadline` | `Date`     | `true`   | The deadline for completing the task.                      |
| `status`   | `String`   | `true`   | The status of the task (e.g., "in-progress", "completed"). |
| `deleted`  | `Boolean`  | `true`   | Indicates if the task is flagged as deleted.               |
| `subtasks` | `Array`    | `false`  | An array of subtasks associated with the task.             |

### Subtask Schema

**Schema:**

| Field      | Type       | Required | Description                                                   |
| ---------- | ---------- | -------- | ------------------------------------------------------------- |
| `_id`      | `ObjectId` | `true`   | Unique identifier for the subtask.                            |
| `subject`  | `String`   | `true`   | The subject or title of the subtask.                          |
| `deadline` | `Date`     | `true`   | The deadline for completing the subtask.                      |
| `status`   | `String`   | `true`   | The status of the subtask (e.g., "in-progress", "completed"). |
| `deleted`  | `Boolean`  | `true`   | Indicates if the subtask is flagged as deleted.               |

## API Endpoints Documentation

### Listing Tasks with Subtasks

**Endpoint:**

- **GET /tasks**
  - Retrieves all tasks and their subtasks for a user.
  - Tasks or subtasks marked as deleted are excluded from the response.

**Request Parameters:**

- `userId` (String): The ID of the user whose tasks are to be retrieved.

### Adding a New Task

**Endpoint:**

- **POST /tasks**
  - Creates a new task for a user.

**Request Body:**

- `userId` (String): The ID of the user for whom the task is created.
- `subject` (String): The subject or title of the task.
- `deadline` (Date): The deadline for completing the task.
- `status` (String): The status of the task (e.g., "in-progress", "completed").

### Editing a Task

**Endpoint:**

- **PUT /tasks/:taskId**
  - Updates an existing task identified by `taskId`.

**Request Parameters:**

- `taskId` (String): The ID of the task to be updated.

**Request Body:**

- `subject` (String, optional): The new subject or title of the task.
- `deadline` (Date, optional): The new deadline for the task.
- `status` (String, optional): The new status of the task.

### Deleting a Task

**Endpoint:**

- **DELETE /tasks/:taskId**
  - Marks a task identified by `taskId` as deleted.

**Request Parameters:**

- `taskId` (String): The ID of the task to be marked as deleted.

### Listing Subtasks for a Task

**Endpoint:**

- **GET /tasks/:taskId/subtasks**
  - Retrieves all non-deleted subtasks associated with a specific task identified by `taskId`.

**Request Parameters:**

- `taskId` (String): The ID of the task whose subtasks are to be retrieved.

### Updating Subtasks for a Task

**Endpoint:**

- **PUT /tasks/:taskId/subtasks**
  - Updates the list of subtasks for a task identified by `taskId`.

**Request Parameters:**

- `taskId` (String): The ID of the task for which subtasks are being updated.

**Request Body:**

- `subtasks` (Array): A list of subtasks to be associated with the task. Each subtask includes `subject`, `deadline`, `status`, and `deleted` fields.

## Swagger API Documentation

**Endpoint:**

- **GET /api-docs**
  - Provides Swagger documentation for all available API endpoints.
  - Access this endpoint after starting the server to view the Swagger UI and interact with the API.

## High-Level Summary

### User-Specific Task Storage

Each user has a distinct record in the database to store their tasks and associated subtasks. All tasks and their related subtasks for a user are contained within this single user record.

### Soft Deletion Implementation

Records flagged for deletion are retained in the database but are omitted from GET API responses, ensuring they are not permanently deleted.

## Project Layout

- **`index.js`**: The primary entry point for the application. It sets up the Express server, establishes a connection to MongoDB, and integrates Swagger documentation.
- **`controllers/taskController.js`**: Houses the logic for managing CRUD operations for tasks and subtasks.
- **`models/User.js`**: Defines the MongoDB schemas and models for users, tasks, and subtasks.
- **`routes/tasks.js`**: Specifies the routes for the API endpoints.
- **`swagger.yml`**: Contains the OpenAPI (Swagger) specification for API documentation.

## Running the Application

### 1. Clone the Github repo

```bash
git clone https://github.com/chetan-skc/Task-Manager-API.git
cd Task-Manager-API\server
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run development server

```bash
npm run dev
```

### 4. Start the application using swagger UI (http://localhost:3000/api-docs)

```bash
npm start
```
