/**
 * TYPE DEFINITIONS FILE
 * 
 * WHY SEPARATE FILE? 
 * - Reusability: Import these types across multiple components
 * - Single source of truth: Change the structure in one place
 * - Organization: Keep type definitions separate from logic
 * 
 * BEST PRACTICE: Always define types for your data structures in TypeScript
 */

/**
 * Represents a single todo item in the application.
 * This interface defines the structure of todo objects stored in state and localStorage.
 * 
 * INTERFACE vs TYPE:
 * - Use 'interface' for object shapes (like this)
 * - Use 'type' for unions, primitives, or complex types (see FilterType below)
 * 
 * GOOD PRACTICE: Document each property so other developers understand the data
 */
export interface Todo {
  /** 
   * Unique identifier for the todo (generated using timestamp + random string)
   * 
   * WHY STRING? 
   * - Could be UUID, timestamp, or database-generated ID
   * - String is flexible for different ID generation strategies
   */
  id: string;
  
  /** 
   * The text content/description of the todo
   * 
   * GOOD PRACTICE: Use descriptive names like 'text' instead of 'todo' or 't'
   */
  text: string;
  
  /** 
   * Whether the todo has been marked as complete
   * 
   * WHY BOOLEAN?
   * - Simple true/false is clear and easy to work with
   * - Could extend to 'pending' | 'in-progress' | 'done' for complex apps
   */
  completed: boolean;
  
  /** 
   * Timestamp of when the todo was created
   * 
   * KEEP IN MIND: 
   * - Date objects don't serialize well to JSON (become strings)
   * - When loading from localStorage, you may need to convert back to Date
   */
  createdAt: Date;
}

/**
 * Defines the possible filter options for displaying todos.
 * - 'all': Show all todos regardless of completion status
 * - 'active': Show only incomplete todos
 * - 'completed': Show only completed todos
 * 
 * WHY USE THIS PATTERN?
 * - Type safety: Can't accidentally use 'invalid' as a filter
 * - Autocomplete: Editor suggests valid options
 * - Self-documenting: Clear what values are allowed
 * 
 * UNION TYPES: The | means "or" - this can be 'all' OR 'active' OR 'completed'
 * 
 * GOOD PRACTICE: Use string literals instead of magic strings throughout your code
 */
export type FilterType = 'all' | 'active' | 'completed';
