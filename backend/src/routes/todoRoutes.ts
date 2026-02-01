// Import Router from Express - creates a mini Express app for organizing routes
// Request/Response types from Express for TypeScript type safety
import { Router, Request, Response } from 'express';
// Import Todo model - gives us database methods like .find(), .create(), etc.
import { Todo } from '../models/Todo';

// Create a new router instance - this will hold all todo-related routes
const router = Router();

// GET / - Fetch all todos from database
// URL: GET /api/todos (because server.ts mounts this at /api/todos)
// Response: Array of todo objects, sorted newest first
router.get('/', async (req: Request, res: Response) => {
  try {
    // Query database: Find all todos, sort by createdAt descending (-1 = newest first)
    const todos = await Todo.find().sort({ createdAt: -1 });
    // Send todos back to client as JSON
    res.json(todos);
  } catch (err) {
    // If database query fails, log error and send 500 status
    console.error('Error fetching todos:', err);
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
});

// POST / - Create a new todo
// URL: POST /api/todos
// Body: { text: "Todo text" }
// Response: The newly created todo object
router.post('/', async (req: Request, res: Response) => {
  try {
    // Extract text from request body (sent by frontend)
    const { text } = req.body;
    
    // Validation: Check if text exists and isn't just whitespace
    if (!text || !text.trim()) {
      // Send 400 Bad Request if validation fails
      return res.status(400).json({ error: 'Text is required' });
    }

    // Create new Todo document with trimmed text
    const todo = new Todo({ text: text.trim() });
    // Save to database (wait for completion with await)
    await todo.save();
    // Send back the created todo with 201 Created status
    res.status(201).json(todo);
  } catch (err) {
    console.error('Error creating todo:', err);
    res.status(500).json({ error: 'Failed to create todo' });
  }
});

// PUT /:id - Update an existing todo
// URL: PUT /api/todos/12345 (id comes from URL parameter)
// Body: { text?: "New text", completed?: true }
// Response: The updated todo object
router.put('/:id', async (req: Request, res: Response) => {
  try {
    // Extract id from URL parameter (/api/todos/:id)
    const { id } = req.params;
    // Extract fields to update from request body
    const { text, completed } = req.body;

    // Build update object - only include fields that were sent
    const updateData: { text?: string; completed?: boolean } = {};
    if (text !== undefined) updateData.text = text;
    if (completed !== undefined) updateData.completed = completed;

    // Find todo by ID and update it
    // Options: new: true returns updated doc, runValidators validates against schema
    const todo = await Todo.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    // If no todo found with that ID, send 404 Not Found
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    // Send back the updated todo
    res.json(todo);
  } catch (err) {
    console.error('Error updating todo:', err);
    res.status(500).json({ error: 'Failed to update todo' });
  }
});

// DELETE /:id - Delete a specific todo
// URL: DELETE /api/todos/12345
// Response: Success message
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    // Extract id from URL parameter
    const { id } = req.params;
    // Find and delete the todo in one operation
    const todo = await Todo.findByIdAndDelete(id);

    // If todo doesn't exist, send 404
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    // Send success message
    res.json({ message: 'Todo deleted successfully' });
  } catch (err) {
    console.error('Error deleting todo:', err);
    res.status(500).json({ error: 'Failed to delete todo' });
  }
});

// DELETE /completed/all - Clear all completed todos
// URL: DELETE /api/todos/completed/all
// Response: Success message
router.delete('/completed/all', async (req: Request, res: Response) => {
  try {
    // Delete all todos where completed = true
    await Todo.deleteMany({ completed: true });
    // Send success message
    res.json({ message: 'Completed todos cleared' });
  } catch (err) {
    console.error('Error clearing completed todos:', err);
    res.status(500).json({ error: 'Failed to clear completed todos' });
  }
});

// Export router so server.ts can mount it at /api/todos
export default router;
