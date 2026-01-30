/**
 * Application Entry Point
 * 
 * This file initializes the React application and renders it to the DOM.
 * It's the first JavaScript file that runs when the app loads.
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

/**
 * Create root and render the application.
 * - StrictMode helps identify potential problems in the app during development
 * - The root element is defined in index.html
 */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
