/**
 * TodoItem Component
 * 
 * COMPONENT PATTERN: Stateful Component with Edit Mode
 * - Displays todo in two modes: view and edit
 * - Local state controls which mode is active
 * - Handles its own UI state, but delegates data changes to parent
 * 
 * GOOD PRACTICE: Component owns its UI state (isEditing), parent owns data (todo)
 * 
 * KEY CONCEPT: Single Responsibility
 * - This component only cares about rendering ONE todo
 * - App.tsx manages the list of todos
 * - Clear separation of concerns
 */
import { useState } from 'react';
import type { Todo } from '../types/todo';
import './TodoItem.css';

/**
 * Props for the TodoItem component
 * 
 * PATTERN: Callback Props for CRUD Operations
 * - Component doesn't modify data directly
 * - Calls parent's functions to request changes
 * - Parent (App) is the single source of truth
 * 
 * WHY THIS PATTERN?
 * - Unidirectional data flow (easier to debug)
 * - Parent controls all data transformations
 * - Component is reusable and predictable
 */
interface TodoItemProps {
  /** The todo object to display */
  todo: Todo;
  
  /** 
   * Callback to toggle the completion status
   * KEEP IN MIND: We only pass the ID up, parent finds and updates the todo
   */
  onToggle: (id: string) => void;
  
  /** Callback to delete the todo */
  onDelete: (id: string) => void;
  
  /** 
   * Callback to update the todo text
   * PATTERN: Pass both ID and new value for updates
   */
  onEdit: (id: string, newText: string) => void;
}

/**
 * Individual todo item component with inline editing capability.
 * 
 * CONDITIONAL RENDERING: Displays differently based on completion status.
 * CSS classes change based on todo.completed (see className="completed")
 */
export const TodoItem = ({ todo, onToggle, onDelete, onEdit }: TodoItemProps) => {
  /**
   * UI STATE: Track whether the todo is in edit mode
   * 
   * WHY LOCAL STATE?
   * - Edit mode is just UI concern (temporary state)
   * - Other components don't need to know about it
   * - If parent managed this, we'd need isEditing state for EVERY todo
   * 
   * PATTERN: Local UI state, lifted data state
   * - isEditing: Lives here (UI only)
   * - todo data: Lives in App (shared data)
   */
  const [isEditing, setIsEditing] = useState(false);
  
  /**
   * TEMPORARY STATE: Local copy of todo text for editing
   * 
   * WHY COPY?
   * - User might cancel - we need to revert to original
   * - Avoid modifying parent state on every keystroke
   * - Only update parent on "Save"
   * 
   * PATTERN: Optimistic local state, commit on save
   */
  const [editText, setEditText] = useState(todo.text);

  /**
   * Handles submission of edited todo text.
   * 
   * PATTERN: Validate → Update → Reset
   * 1. Prevent default form submission
   * 2. Validate input (not empty)
   * 3. Call parent's update function
   * 4. Exit edit mode
   * 
   * GOOD PRACTICE: Validate before sending to parent
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editText.trim()) {
      onEdit(todo.id, editText.trim()); // Send up to parent
      setIsEditing(false); // Return to view mode
    }
  };

  /**
   * Cancels editing and reverts text to original value.
   * 
   * IMPORTANT: This is why we keep a local copy (editText)
   * - User's changes are discarded
   * - Original todo.text is restored
   * 
   * UX CONSIDERATION: Always provide a way to cancel destructive actions
   */
  const handleCancel = () => {
    setEditText(todo.text); // Revert to original
    setIsEditing(false); // Exit edit mode
  };

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      {isEditing ? (
        <form onSubmit={handleSubmit} className="edit-form">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="edit-input"
            autoFocus
          />
          <div className="edit-buttons">
            <button type="submit" className="btn btn-save">Save</button>
            <button type="button" onClick={handleCancel} className="btn btn-cancel">Cancel</button>
          </div>
        </form>
      ) : (
        <div className="todo-content">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
            className="todo-checkbox"
          />
          <span className="todo-text" onClick={() => onToggle(todo.id)}>
            {todo.text}
          </span>
          <div className="todo-actions">
            <button
              onClick={() => setIsEditing(true)}
              className="btn btn-edit"
              disabled={todo.completed}
            >
              Edit
            </button>
            <button onClick={() => onDelete(todo.id)} className="btn btn-delete">
              Delete
            </button>
          </div>
        </div>
      )}
    </li>
  );
};
