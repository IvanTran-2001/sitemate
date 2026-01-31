import { useState } from 'react';
import type { Todo } from '../types/todo';
import './TodoItem.css';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
}

export const TodoItem = ({ todo, onToggle, onDelete, onEdit }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editText.trim()) {
      onEdit(todo.id, editText.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
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
