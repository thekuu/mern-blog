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

## Deployment Instructions

### Backend (Render)
1. Create a new Web Service on Render.
2. Connect your GitHub repository.
3. Set **Root Directory** to `api`.
4. Set **Build Command** to `npm install`.
5. Set **Start Command** to `node index.js`.
6. Add environment variables:
   - `MONGO_URI`: Your MongoDB connection string.
   - `PORT`: 10000 (Render's default).
   - `NODE_ENV`: production.

### Frontend (Vercel/Netlify)
1. Connect your GitHub repository.
2. Set **Root Directory** to `client`.
3. Set **Build Command** to `npm run build`.
4. Set **Output Directory** to `build`.
5. Ensure your API calls point to your Render backend URL (you may need to update the proxy or use environment variables for the API base URL).

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
- 2026-02-23: UI/UX & Best Practices Overhaul
  - Integrated Tailwind CSS for modern, responsive styling
  - Refactored Navbar and Footer for better UX and mobile responsiveness
  - Added loading states and improved error handling in frontend components
  - Modernized Login/Register pages with better feedback and styling
  - Optimized SEO with updated meta tags and titles
  - Cleaned up unused SCSS and imports
  - Updated deployment instructions for production readiness
