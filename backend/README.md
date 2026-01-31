# Todo App Backend

Full-stack todo application with Node.js + Express + MongoDB backend.

## Prerequisites

- Node.js (v16+)
- MongoDB installed and running locally

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file (copy from `.env.example`):
```bash
MONGODB_URI=mongodb://localhost:27017/todoapp
PORT=3000
NODE_ENV=development
```

3. Make sure MongoDB is running:
```bash
mongod
```

## Run Development Server

```bash
npm run dev
```

Server will start on http://localhost:3000

## API Endpoints

- `GET /api/todos` - Get all todos
- `POST /api/todos` - Create new todo
- `PUT /api/todos/:id` - Update todo (text or completed)
- `DELETE /api/todos/:id` - Delete todo
- `DELETE /api/todos/completed/all` - Clear all completed todos

## Build for Production

```bash
npm run build
npm start
```
