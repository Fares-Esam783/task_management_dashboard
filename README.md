# TaskFlow - Task Management Dashboard

A modern, production-ready task management dashboard built with React, TypeScript, and Tailwind CSS. Features a beautiful UI with dark/light mode, drag-and-drop functionality, advanced filtering, and comprehensive task management capabilities.

![TaskFlow Dashboard](https://img.shields.io/badge/React-18.2-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-blue) ![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.0-purple)

## ✨ Features

### Core Functionality

- ✅ **User Authentication** - Secure login and registration with session persistence
- ✅ **Task CRUD Operations** - Create, read, update, and delete tasks
- ✅ **Drag & Drop** - Intuitive kanban board with drag-and-drop task management
- ✅ **Advanced Filtering** - Filter by status, priority, and search by keywords
- ✅ **Smart Sorting** - Sort tasks by due date, priority, or creation date
- ✅ **Real-time Updates** - Instant UI updates with optimistic rendering

### Task Properties

- 📝 Title and description
- 🎯 Status (To Do, In Progress, Done)
- ⚡ Priority levels (Low, Medium, High)
- 📅 Due dates with overdue indicators
- 🏷️ Automatic timestamps (created/updated)

### User Experience

- 🌓 **Dark/Light Mode** - Seamless theme switching with persistence
- 📱 **Fully Responsive** - Perfect experience on mobile, tablet, and desktop
- ♿ **Accessible** - WCAG compliant with keyboard navigation and ARIA labels
- 🎨 **Modern UI** - Beautiful gradients, smooth animations, and micro-interactions
- 💾 **Data Persistence** - All data saved to LocalStorage
- 🔔 **Loading States** - Skeleton loaders and smooth transitions
- 🎯 **Empty States** - Helpful guidance when no tasks exist

## 🛠️ Tech Stack

### Frontend Framework

- **React 18.2** - Modern React with hooks and concurrent features
- **TypeScript 5.2** - Full type safety and enhanced developer experience
- **Vite 5.0** - Lightning-fast build tool and dev server

### State Management

- **Redux Toolkit 2.0** - Simplified Redux with built-in best practices
- **React Redux 9.0** - Official React bindings for Redux

### UI & Styling

- **Tailwind CSS 3.4** - Utility-first CSS framework
- **Lucide React** - Beautiful, consistent icon set
- **clsx** - Conditional className utility

### Drag & Drop

- **@dnd-kit/core** - Modern, performant drag-and-drop toolkit
- **@dnd-kit/sortable** - Sortable preset for lists
- **@dnd-kit/utilities** - Helper utilities for drag-and-drop

### Form Management

- **React Hook Form 7.49** - Performant form validation
- **Zod 3.22** - TypeScript-first schema validation

### Utilities

- **date-fns 3.0** - Modern date utility library
- **React Router DOM 6.21** - Declarative routing for React

## 📁 Project Structure

```
src/
├── components/
│   ├── auth/              # Authentication components
│   │   ├── LoginForm.tsx
│   │   ├── RegisterForm.tsx
│   │   └── ProtectedRoute.tsx
│   ├── layout/            # Layout components
│   │   ├── Header.tsx
│   │   └── DashboardLayout.tsx
│   ├── tasks/             # Task management components
│   │   ├── TaskCard.tsx
│   │   ├── TaskForm.tsx
│   │   ├── TaskBoard.tsx
│   │   └── TaskFilters.tsx
│   ├── ui/                # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   └── Modal.tsx
│   └── common/            # Common components
│       ├── LoadingSkeleton.tsx
│       └── EmptyState.tsx
├── features/              # Redux slices
│   ├── auth/
│   │   └── authSlice.ts
│   └── tasks/
│       └── tasksSlice.ts
├── hooks/                 # Custom React hooks
│   ├── useRedux.ts
│   ├── useTheme.ts
│   └── useDebounce.ts
├── pages/                 # Page components
│   └── Dashboard.tsx
├── store/                 # Redux store configuration
│   └── index.ts
├── types/                 # TypeScript type definitions
│   ├── auth.ts
│   └── task.ts
├── utils/                 # Utility functions
│   ├── mockAuth.ts
│   ├── localStorage.ts
│   └── dateHelpers.ts
├── App.tsx                # Root component with routing
├── main.tsx               # Application entry point
└── index.css              # Global styles and Tailwind directives
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd task-management-dashboard
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The optimized production build will be in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## 📖 Usage Guide

### First Time Setup

1. **Register an Account**

   - Click "Sign up" on the login page
   - Enter your name, email, and password
   - Your account will be created and stored locally

2. **Login**
   - Use your registered email and password
   - Your session will persist across browser refreshes

### Managing Tasks

#### Creating Tasks

1. Click the "New Task" button in the header
2. Fill in the task details:
   - Title (required)
   - Description (optional)
   - Status (To Do, In Progress, Done)
   - Priority (Low, Medium, High)
   - Due Date (required)
3. Click "Create Task"

#### Editing Tasks

1. Click the edit icon (pencil) on any task card
2. Modify the task details
3. Click "Update Task"

#### Deleting Tasks

1. Click the delete icon (trash) on any task card
2. Confirm the deletion in the dialog

#### Drag & Drop

- Simply drag any task card to a different status column
- The task status will update automatically

### Filtering & Searching

#### Search

- Use the search bar to find tasks by title or description
- Search is debounced for better performance

#### Filters

1. Click the "Filters" button
2. Select filters:
   - **Status**: Filter by To Do, In Progress, or Done
   - **Priority**: Filter by Low, Medium, or High
   - **Sort By**: Sort by created date, due date, or priority
3. Click "Clear Filters" to reset

### Theme Toggle

- Click the sun/moon icon in the header to switch between light and dark mode
- Your preference is saved automatically

## 🎨 Design Highlights

### Color Palette

- **Primary**: Blue gradient (#0ea5e9 to #0369a1)
- **Success**: Green (#22c55e)
- **Warning**: Amber (#f59e0b)
- **Danger**: Red (#ef4444)

### Animations

- Smooth transitions on all interactive elements
- Slide-in animations for modals and dropdowns
- Shimmer effect on loading skeletons
- Drag overlay with rotation effect

### Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🔒 Authentication

The application uses a mock authentication system that stores user data in LocalStorage. This can easily be replaced with a real backend (Firebase, Auth0, custom API) by:

1. Replacing the functions in `src/utils/mockAuth.ts`
2. Updating the Redux thunks in `src/features/auth/authSlice.ts`
3. Adding API endpoints for user management

## 💾 Data Persistence

All data is stored in the browser's LocalStorage:

- **User accounts**: `task_dashboard_users`
- **Current session**: `task_dashboard_current_user`
- **Tasks**: `task_dashboard_tasks`
- **Theme preference**: `task_dashboard_theme`

## 🧪 Testing

The application has been manually tested for:

- ✅ All CRUD operations
- ✅ Drag and drop functionality
- ✅ Filtering and searching
- ✅ Theme switching
- ✅ Responsive design
- ✅ Form validation
- ✅ Error handling
- ✅ Browser compatibility (Chrome, Firefox, Safari, Edge)

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository in Vercel
3. Vercel will auto-detect Vite and configure the build
4. Deploy!

### Netlify

1. Push your code to GitHub
2. Connect repository to Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Deploy!

## 🔮 Future Enhancements

- [ ] Backend integration with REST API
- [ ] Real-time collaboration with WebSockets
- [ ] Task categories and tags
- [ ] Task comments and attachments
- [ ] Email notifications for due dates
- [ ] Calendar view
- [ ] Task templates
- [ ] Export tasks to CSV/JSON
- [ ] Team workspaces
- [ ] Analytics dashboard

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Developer

Built with ❤️ using modern web technologies.

---

**Note**: This is a production-ready application with clean architecture, TypeScript type safety, and best practices throughout. The codebase is well-documented and easy to extend.
