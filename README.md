# 📝 Todo App - React + TypeScript

A modern, fully-featured todo application built with React, TypeScript, and Vite. This project demonstrates full-stack development skills including component architecture, state management, TypeScript interfaces, and responsive CSS design.

## 🚀 Live Demo

**Local Development:** [http://localhost:5173/](http://localhost:5173/)

## ✨ Features

- ✅ **Add todos** - Create new tasks with a clean input form
- ✏️ **Edit todos** - Update existing tasks inline
- ✔️ **Toggle completion** - Mark tasks as complete/incomplete
- 🗑️ **Delete todos** - Remove unwanted tasks
- 🔍 **Filter todos** - View all, active, or completed tasks
- 💾 **Local persistence** - Automatically saves to localStorage
- 📱 **Responsive design** - Works on mobile, tablet, and desktop
- 🎨 **Modern UI** - Beautiful gradient design with smooth animations

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **CSS3** - Custom responsive styling
- **localStorage** - Client-side data persistence

## 📁 Project Structure

```
sitemate/
├── src/
│   ├── components/
│   │   ├── TodoForm.tsx          # Add new todos
│   │   ├── TodoForm.css
│   │   ├── TodoItem.tsx          # Individual todo component
│   │   ├── TodoItem.css
│   │   ├── TodoFilter.tsx        # Filter controls
│   │   └── TodoFilter.css
│   ├── types/
│   │   └── todo.ts               # TypeScript interfaces
│   ├── App.tsx                   # Main app component
│   ├── App.css                   # Global styles
│   └── main.tsx                  # Entry point
├── package.json
└── README.md
```

## 🎯 Key Features for Sitemate Application

This project demonstrates skills directly relevant to the Sitemate Junior Full Stack Engineer role:

### 1. **React + TypeScript** ✅
- Component-based architecture with functional components
- TypeScript interfaces for type safety
- Props and state management with proper typing

### 2. **Frontend/CSS Skills** ✅
- Custom CSS with responsive design
- Mobile-first approach
- Animations and transitions
- Modern layout with Flexbox/Grid

### 3. **Clean Code Practices** ✅
- Modular component structure
- Separation of concerns
- Reusable components
- Clear naming conventions

### 4. **State Management** ✅
- useState for local state
- useEffect for side effects
- Lifting state up pattern

### 5. **CRUD Operations** ✅
- Create (add todos)
- Read (display todos)
- Update (edit/toggle todos)
- Delete (remove todos)

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Navigate to project directory
cd "d:\Git Repo\IvanTran-2001.github.io\sitemate"

# Install dependencies 
npm install

# Start development server
npm run dev
```

### Available Scripts

```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## 📱 Usage

1. **Add a Todo**: Type in the input field and click "Add Todo"
2. **Complete a Todo**: Click the checkbox or click on the todo text
3. **Edit a Todo**: Click "Edit", modify the text, and save
4. **Delete a Todo**: Click the "Delete" button
5. **Filter Todos**: Use the All/Active/Completed buttons
6. **Clear Completed**: Remove all completed todos at once

## 🎨 Design Decisions

### Component Architecture
- **TodoForm**: Controlled component with form validation
- **TodoItem**: Self-contained with edit mode functionality
- **TodoFilter**: Reusable filter with count badges

### State Management
- Single source of truth in App component
- Props drilling for simple app structure
- localStorage for persistence

### TypeScript Usage
- Strict type checking enabled
- Interface definitions for all data structures
- Type-safe props and state

### CSS Approach
- No CSS frameworks - demonstrates raw CSS skills
- Component-scoped styling
- Responsive breakpoints for mobile
- Smooth transitions and hover effects

## 🔄 Next Steps (Backend Integration)

To make this a full-stack application:

1. **Backend API** (Node.js + Express + TypeScript)
   - RESTful endpoints for CRUD operations
   - MongoDB integration for persistence
   - User authentication (JWT)

2. **Advanced Features**
   - User accounts
   - Shared todo lists
   - Real-time updates with WebSockets
   - Due dates and priorities
   - Tags and categories

3. **Deployment**
   - Frontend: Vercel/Netlify
   - Backend: Render/Railway
   - Database: MongoDB Atlas

## 📚 Learning Outcomes

By building this project, I've demonstrated:

- ✅ **React fundamentals** - Components, hooks, props, state
- ✅ **TypeScript** - Interfaces, types, generics
- ✅ **CSS mastery** - Layouts, responsive design, animations
- ✅ **Clean architecture** - Modular, maintainable code
- ✅ **User experience** - Intuitive UI, smooth interactions

## 🎯 Relevant to Sitemate Role

This project directly addresses Sitemate's requirements:

- **JavaScript/TypeScript** ✅ (React + TypeScript throughout)
- **React** ✅ (Functional components with hooks)
- **CSS** ✅ (Custom responsive styling)
- **Clean code** ✅ (Modular architecture, type safety)
- **Fast learner** ✅ (Built from scratch in short time)

## 📝 License

MIT

## 👤 Author

**Ivan Tran**
- Portfolio: [ivantran-2001.github.io](https://ivantran-2001.github.io/)
- GitHub: [@IvanTran-2001](https://github.com/IvanTran-2001)
- Email: mystoganx2001@gmail.com
