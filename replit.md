# MERN Blog Application

## Overview
A full-stack blog application built with MongoDB, Express.js, React, and Node.js (MERN stack). Users can register, login, create/edit/delete blog posts with categories (Art, Science, Technology, Cinema, Design, Food), and upload images.

## Project Architecture
- **Frontend**: React (Create React App) in `client/` directory, runs on port 5000
- **Backend**: Express.js API in `api/` directory, runs on port 3000
- **Database**: MongoDB (via Mongoose ODM)
- **Authentication**: JWT-based with cookies

### Directory Structure
```
├── api/                    # Express.js backend
│   ├── controllers/        # Route handlers (auth, post, user)
│   ├── models/            # Mongoose models (user, post)
│   ├── routes/            # Express routes
│   ├── uploads/           # Uploaded files
│   ├── db.js              # MongoDB connection
│   └── index.js           # Server entry point
├── client/                # React frontend
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # Navbar, Footer, Menu
│   │   ├── context/       # Auth context (React Context API)
│   │   ├── pages/         # Home, Login, Register, Single, Write
│   │   └── img/           # Image assets
│   └── package.json
└── package.json           # Root package.json
```

## Environment Variables
- `MONGO_URI` (secret): MongoDB connection string

## Recent Changes
- 2026-02-21: Initial Replit setup
  - Fixed hardcoded external URLs to use relative API paths
  - Added `/api` prefix to all frontend API calls to match backend routes
  - Added CRA proxy configuration pointing to backend (port 3000)
  - Configured frontend to run on port 5000 with host 0.0.0.0
  - Backend binds to localhost:3000
  - Removed unused `querystring` imports that caused webpack errors
  - Made MongoDB connection non-fatal (warns instead of crashing when MONGO_URI not set)
  - Conditional static file serving (only in production)
