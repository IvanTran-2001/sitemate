/**
 * Main App Component
 * 
 * Root component that manages the todo application state and coordinates
 * all child components. Handles:
 * - Todo CRUD operations (Create, Read, Update, Delete)
 * - Filtering logic
 * - localStorage persistence
 */
import { useState, useEffect } from 'react';
import { TodoForm } from './components/TodoForm';
import { TodoItem } from './components/TodoItem';
import { TodoFilter } from './components/TodoFilter';
import type { Todo, FilterType } from './types/todo';
import './App.css';

/**
 * Main application component.
 * Maintains the list of todos and current filter state.
 */
function App() {
  /**
   * MAIN STATE: Array of all todos
   * 
   * PATTERN: Initialize from localStorage
   * - Function form of useState runs only once on mount
   * - Attempts to load saved data
   * - Falls back to empty array if no saved data
   * 
   * WHY FUNCTION FORM?
   * - Expensive operations should only run once
   * - Reading/parsing localStorage can be slow
   * - Regular initializer would run on every render
   * 
   * GOOD PRACTICE: Always provide fallback for missing/invalid data
   */
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });
  
  /** 
   * FILTER STATE: Current filter selection
   * 
   * SIMPLE STATE: No initialization needed, just default to 'all'
   * 
   * TYPE ANNOTATION: FilterType ensures only valid values
   */
  const [filter, setFilter] = useState<FilterType>('all');

  /**
   * SIDE EFFECT: Persist todos to localStorage whenever they change.
   * 
   * useEffect PATTERN:
   * - Runs after every render where 'todos' changed
   * - Synchronizes state with external system (localStorage)
   * - No cleanup needed (return statement)
   * 
   * WHY useEffect?
   * - Persisting data is a "side effect" (affects outside world)
   * - Should happen after render, not during
   * - Dependency array [todos] means "run when todos changes"
   * 
   * KEEP IN MIND:
   * - This runs on EVERY todo change (could optimize with debouncing)
   * - localStorage is synchronous (blocks main thread)
   * - JSON.stringify converts Date objects to strings (acceptable here)
   */
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]); // Dependency: Only re-run when todos changes

  /**
   * CREATE: Adds a new todo to the list
   * 
   * PATTERN: Immutable State Updates
   * - Don't mutate: todos.push(newTodo) ❌
   * - Create new array: [newTodo, ...todos] ✅
   * 
   * WHY IMMUTABLE?
   * - React detects changes by reference comparison
   * - Mutations don't trigger re-renders
   * - Immutability makes state changes predictable
   * 
   * SPREAD OPERATOR: ...todos creates a copy of the array
   * NEW ITEMS FIRST: [newTodo, ...todos] puts new items at the top
   * 
   * ID GENERATION:
   * - Date.now() = timestamp (milliseconds since 1970)
   * - Math.random() = random decimal
   * - .toString(36) = convert to base36 (0-9, a-z)
   * - .substr(2, 9) = take 9 characters
   * - Result: "1769642280287-qohugjqkt" (unique enough for this app)
   * 
   * PRODUCTION NOTE: Use UUID library or database IDs in real apps
   */
  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      text,
      completed: false,
      createdAt: new Date(),
    };
    setTodos([newTodo, ...todos]); // Immutable update: create new array
  };

  /**
   * UPDATE: Toggles the completion status of a todo
   * 
   * PATTERN: Map to transform array
   * - Finds the todo by ID
   * - Creates new object with toggled 'completed'
   * - Keeps other todos unchanged
   * 
   * TERNARY: condition ? valueIfTrue : valueIfFalse
   * SPREAD: { ...todo } creates a copy of the object
   * OVERRIDE: { ...todo, completed: !todo.completed } copies all properties, then overrides 'completed'
   * 
   * WHY MAP?
   * - Returns new array (immutable)
   * - Elegant way to update one item in array
   * - Clear intent: "transform each todo"
   */
  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  /**
   * DELETE: Removes a todo from the list
   * 
   * PATTERN: Filter to remove items
   * - Keep only todos that DON'T match the ID
   * - Returns new array without the deleted item
   * 
   * WHY FILTER?
   * - Clean and declarative: "keep all except this one"
   * - Returns new array (immutable)
   * - No mutation needed
   * 
   * GOOD PRACTICE: Use filter for deletions, map for updates
   */
  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  /**
   * UPDATE: Changes the text of an existing todo
   * 
   * SAME PATTERN as toggleTodo, but updates 'text' instead of 'completed'
   * 
   * CONSISTENCY: All update functions follow same pattern (map + spread)
   */
  const editTodo = (id: string, newText: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    ));
  };

  /**
   * BULK DELETE: Removes all completed todos
   * 
   * PATTERN: Filter based on property
   * - Keeps only todos where completed is false
   * - Useful for "cleanup" after finishing tasks
   * 
   * UX CONSIDERATION: Provide bulk actions when dealing with lists
   */
  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  /**
   * DERIVED STATE: Filtered list of todos
   * 
   * NOT useState! This is calculated from existing state (todos + filter)
   * 
   * WHY NOT STATE?
   * - It's derived from other state
   * - Always up-to-date automatically
   * - Less code, fewer bugs
   * 
   * PATTERN: Filter array based on conditions
   * - Returns new array (doesn't modify original)
   * - Runs on every render (fast for small lists)
   * 
   * OPTIMIZATION: For huge lists (1000+), consider useMemo
   */
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true; // 'all' filter
  });

  /**
   * DERIVED STATE: Count todos in each category
   * 
   * COMPUTED VALUES: Calculated from todos array on every render
   * 
   * PATTERN: Object with calculated properties
   * - Clean structure for passing to child components
   * - Easy to extend (add 'overdue', 'priority', etc.)
   * 
   * KEEP IN MIND: Runs on every render (acceptable for small arrays)
   */
  const counts = {
    all: todos.length,
    active: todos.filter(t => !t.completed).length,
    completed: todos.filter(t => t.completed).length,
  };

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1>📝 Todo App</h1>
          <p className="subtitle">Built with React + TypeScript</p>
        </header>

        <TodoForm onAdd={addTodo} />

        <TodoFilter
          currentFilter={filter}
          onFilterChange={setFilter}
          counts={counts}
        />

        {filteredTodos.length === 0 ? (
          <div className="empty-state">
            <p>
              {filter === 'all' && '✨ No todos yet. Add one to get started!'}
              {filter === 'active' && '🎉 All done! No active todos.'}
              {filter === 'completed' && '📭 No completed todos yet.'}
            </p>
          </div>
        ) : (
          <ul className="todo-list">
            {filteredTodos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onEdit={editTodo}
              />
            ))}
          </ul>
        )}

        {counts.completed > 0 && (
          <button onClick={clearCompleted} className="clear-completed">
            Clear Completed ({counts.completed})
          </button>
        )}

        <footer className="footer">
          <p>💡 Click on a todo to mark as complete</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
