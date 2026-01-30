/**
 * TodoFilter Component
 * 
 * Provides filter buttons to show different subsets of todos.
 * Displays the count of todos in each category.
 */
import type { FilterType } from '../types/todo';
import './TodoFilter.css';

/**
 * Props for the TodoFilter component
 */
interface TodoFilterProps {
  /** The currently active filter */
  currentFilter: FilterType;
  
  /** Callback when a filter button is clicked */
  onFilterChange: (filter: FilterType) => void;
  
  /** Count of todos in each category for display badges */
  counts: {
    all: number;
    active: number;
    completed: number;
  };
}

/**
 * Filter bar component that allows users to switch between
 * viewing all, active, or completed todos.
 */
export const TodoFilter = ({ currentFilter, onFilterChange, counts }: TodoFilterProps) => {
  return (
    <div className="todo-filter">
      <button
        className={`filter-btn ${currentFilter === 'all' ? 'active' : ''}`}
        onClick={() => onFilterChange('all')}
      >
        All <span className="count">{counts.all}</span>
      </button>
      <button
        className={`filter-btn ${currentFilter === 'active' ? 'active' : ''}`}
        onClick={() => onFilterChange('active')}
      >
        Active <span className="count">{counts.active}</span>
      </button>
      <button
        className={`filter-btn ${currentFilter === 'completed' ? 'active' : ''}`}
        onClick={() => onFilterChange('completed')}
      >
        Completed <span className="count">{counts.completed}</span>
      </button>
    </div>
  );
};
