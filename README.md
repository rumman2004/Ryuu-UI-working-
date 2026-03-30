# UI Library Platform

A full-stack web application for managing and sharing reusable UI components. Built with React, Express, and MongoDB.

## Project Structure

- **admin/**: Admin panel for managing components, categories, and tags
- **backend/**: REST API server with authentication and file uploads
- **frontend/**: Public-facing component library with search and preview features

## Features

- **Component Management**: Add, edit, and categorize UI components
- **Live Preview**: Interactive component previews using Sandpack
- **Authentication**: JWT-based admin authentication
- **File Uploads**: Cloudinary integration for images
- **Search & Filter**: Advanced component discovery
- **Favorites**: User favorites system
- **Code Copying**: One-click code copying with syntax highlighting
- **ZIP Downloads**: Download component code as ZIP files

## Tech Stack

- **Frontend/Admin**: React 18/19, Vite, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Authentication**: JWT, bcrypt
- **File Storage**: Cloudinary
- **Code Editor**: Monaco Editor

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB
- Cloudinary account (for image uploads)

### Installation

1. Clone the repository
2. Install dependencies for each part:

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install

# Admin
cd ../admin
npm install
```

3. Set up environment variables (see .env.example files)
4. Start MongoDB
5. Run the applications:

```bash
# Backend (port 5000)
cd backend
npm run dev

# Frontend (port 5173)
cd frontend
npm run dev

# Admin (port 5174)
cd admin
npm run dev
```

## API Documentation

The backend provides RESTful APIs for:
- Authentication (/api/auth)
- Components (/api/components)
- Categories (/api/categories)
- Tags (/api/tags)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License