import { useState, useEffect } from 'react';
import { TodoForm } from './components/TodoForm';
import { TodoItem } from './components/TodoItem';
import { TodoFilter } from './components/TodoFilter';
import type { Todo, TodoResponse, FilterType } from './types/todo';
import { todoAPI } from './api/todoAPI';
import './App.css';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      const data = await todoAPI.getAll();
      const formattedTodos = data.map((todo: TodoResponse) => ({
        id: todo._id,
        text: todo.text,
        completed: todo.completed,
        createdAt: new Date(todo.createdAt)
      }));
      setTodos(formattedTodos);
    } catch (error) {
      console.error('Failed to load todos:', error);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (text: string) => {
    try {
      const newTodo = await todoAPI.create(text);
      setTodos([{
        id: newTodo._id,
        text: newTodo.text,
        completed: newTodo.completed,
        createdAt: new Date(newTodo.createdAt)
      }, ...todos]);
    } catch (error) {
      console.error('Failed to add todo:', error);
    }
  };

  const toggleTodo = async (id: string) => {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;

    try {
      await todoAPI.update(id, { completed: !todo.completed });
      setTodos(todos.map(t =>
        t.id === id ? { ...t, completed: !t.completed } : t
      ));
    } catch (error) {
      console.error('Failed to toggle todo:', error);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await todoAPI.delete(id);
      setTodos(todos.filter(t => t.id !== id));
    } catch (error) {
      console.error('Failed to delete todo:', error);
    }
  };

  const editTodo = async (id: string, newText: string) => {
    try {
      await todoAPI.update(id, { text: newText });
      setTodos(todos.map(t =>
        t.id === id ? { ...t, text: newText } : t
      ));
    } catch (error) {
      console.error('Failed to edit todo:', error);
    }
  };

  const clearCompleted = async () => {
    try {
      await todoAPI.clearCompleted();
      setTodos(todos.filter(t => !t.completed));
    } catch (error) {
      console.error('Failed to clear completed:', error);
    }
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

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
          <p className="subtitle">Built with React + TypeScript + Node.js</p>
        </header>

        {loading ? (
          <div className="empty-state">
            <p>Loading todos...</p>
          </div>
        ) : (
          <>
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
          </>
        )}

        <footer className="footer">
          <p>💡 Click on a todo to mark as complete</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
