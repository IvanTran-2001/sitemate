/**
 * TodoForm Component
 * 
 * COMPONENT PATTERN: Form with Controlled Input
 * - The input value is controlled by React state (text)
 * - Every keystroke updates state
 * - Single source of truth for form data
 * 
 * WHY THIS PATTERN?
 * - Easy to validate, transform, or clear input
 * - React state is the "source of truth"
 * - Predictable behavior
 * 
 * BEST PRACTICE: Keep forms simple and focused on one task
 */
import { useState } from 'react';
import './TodoForm.css';

/**
 * Props for the TodoForm component
 * 
 * PATTERN: Callback Props
 * - Parent (App) passes down a function
 * - Child (TodoForm) calls it when needed
 * - This is "lifting state up" - state lives in parent, child just notifies
 * 
 * WHY? Keeps data flow unidirectional (top-down)
 */
interface TodoFormProps {
  /** 
   * Callback function called when a new todo is submitted
   * 
   * KEEP IN MIND: This is how child components communicate with parents
   */
  onAdd: (text: string) => void;
}

/**
 * Form component for adding new todos.
 * Uses controlled input with local state for the text field.
 * 
 * GOOD PRACTICE: Export as named export (not default) for better refactoring
 */
export const TodoForm = ({ onAdd }: TodoFormProps) => {
  /**
   * LOCAL STATE for the input field
   * 
   * WHY LOCAL STATE HERE?
   * - This text is only needed by this form
   * - No other component needs to know about it
   * - Keeps App.tsx clean and focused
   * 
   * RULE OF THUMB: Keep state as local as possible, lift up only when needed
   */
  const [text, setText] = useState('');

  /**
   * Handles form submission.
   * 
   * PATTERN: Controlled Form Submission
   * 1. Prevent default (stops page refresh)
   * 2. Validate (check input is not empty)
   * 3. Call parent callback (lift data up)
   * 4. Clear input (reset form)
   * 
   * GOOD PRACTICE: Always validate user input
   * KEEP IN MIND: trim() removes whitespace - "   " becomes ""
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // IMPORTANT: Prevents page reload on form submit
    
    if (text.trim()) { // Validation: Don't add empty todos
      onAdd(text.trim()); // Send to parent
      setText(''); // Clear input after successful submission
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      {/* 
        CONTROLLED INPUT PATTERN:
        - value={text}: Input displays what's in state
        - onChange: Every keystroke updates state
        - This makes React the "source of truth"
        
        GOOD PRACTICE: Always provide placeholder text for better UX
      */}
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)} // Update state on every keystroke
        placeholder="What needs to be done?"
        className="todo-input"
      />
      {/*
        ACCESSIBILITY TIP: 
        - type="submit" allows Enter key to submit
        - Form wrapping enables native form behavior
      */}
      <button type="submit" className="todo-submit">
        Add Todo
      </button>
    </form>
  );
};
