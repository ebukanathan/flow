## TaskFlow – Task Management App

Full-Stack Task Management App built with React, Node.js, Express, Prisma, and PostgreSQL.
A project demonstrating end-to-end web development, role-based authentication, and project/task management functionality.

Table of content


## Overview

TaskFlow is a web application that allows users to manage projects and tasks efficiently.
Users can create projects, add tasks, assign priorities and due dates, and track progress in real-time.

This project was built solo, demonstrating the ability to handle frontend, backend, and database integration end-to-end.

## Features

- User Authentication: Secure login/signup with role-based access

- Project Management: Create, view, and manage multiple projects

- Task Management: Add tasks to projects, set priorities, due dates, and statuses

- Real-Time Updates: Frontend uses React Query (TanStack) to update UI immediately

- Optimistic Updates: Tasks appear instantly on creation

- Responsive Design: Works well on mobile and desktop

- Secure Backend: Express + Prisma + PostgreSQL with session management


## Tech Stack

| Layer                 | Technology                                        |
| --------------------- | ------------------------------------------------- |
| Frontend              | React, React Router, Tailwind CSS, TanStack Query |
| Backend               | Node.js, Express, Prisma                          |
| Database              | PostgreSQL                                        |
| Authentication        | Session-based, role-based access control          |
| Hosting (Recommended) | Railway / Render (free tier)                      |

Backend Structure
```

src/
├─ controllers/     # Request handlers (auth, project, task)
├─ routes/          # API routes
├─ middleware/      # Auth & error handling middleware
├─ libs/            # Prisma client abstraction
├─ utils/           # Helper functions
└─ server.ts        # App entry point

```
Frontend structure:
```
src/
├─ features/
│  ├─ auth/         # Login, signup hooks & components
│  ├─ projects/     # Project and task hooks/components
│  └─ tasks/
├─ components/      # Reusable components
├─ pages/           # Routes (Login, Dashboard, Profile)
├─ App.jsx
└─ api.js           # Axios instance for backend requests
```

### Usage

1. Signup or login as a user

2. Create a new project

3. Add tasks under each project

4. Set priority, due date, and status

5. View tasks under each project in dashboard

6. Tasks appear instantly thanks to Tanstack Query optimistic updates

## Screenshots

## Future Improvements

- Add task assignment to multiple users

- Notifications for upcoming due dates

- Drag-and-drop task reordering

- Real-time updates via WebSockets
