# Engineering Study Platform

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [File Upload](#file-upload)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Introduction

The Engineering Study Platform is a web application designed to facilitate the sharing and management of study materials among engineering students. It provides a centralized platform where students can access, upload, and manage educational resources specific to their department and semester.

## Features

- User authentication and authorization (Student, Student Admin, Admin roles)
- Material browsing with filtering by department and semester
- Material upload for Student Admins and Admins
- User dashboard with personal information and uploaded materials
- Admin panel for user management and material moderation
- Responsive design for various devices
- File upload to Cloudinary for efficient storage and retrieval

## Tech Stack

- Frontend:
  - Next.js 13 (App Router)
  - React
  - TypeScript
  - Tailwind CSS
  - shadcn/ui components
  - React Query for state management
- Backend:
  - Node.js
  - Express.js
  - MongoDB with Mongoose
- Authentication:
  - JSON Web Tokens (JWT)
- File Storage:
  - Cloudinary
- Deployment:
  - Vercel (Frontend and Backend)

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- MongoDB database
- Cloudinary account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Omi-Patel/Saarthi_EngStudy_Frontend
   cd Saarthi_EngStudy_Frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following variables:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:3000/api
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
saarthi-engstudy/
├── frontend/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   └── ...
│   │   ├── dashboard/
│   │   ├── materials/
│   │   ├── upload-material/
│   │   ├── admin/
│   │   ├── request-admin/
│   │   └── ...
│   ├── components/
│   │   ├── ui/
│   │   └── ...
│   ├── lib/
│   │   ├── AuthContext.tsx
│   │   ├── axios.ts
│   │   └── ...
│   ├── public/
│   ├── styles/
│   ├── types/
│   ├── .env.local
│   ├── next.config.js
│   ├── package.json
│   └── tsconfig.json
├── backend/
│   ├── routes/
│   │   ├── auth.js
│   │   ├── material.js
│   │   ├── adminUser.js
│   │   └── studentAdmin.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Material.js
│   │   └── ...
│   ├── middleware/
│   ├── controllers/
│   ├── config/
│   ├── .env
│   ├── server.js
│   └── package.json
├── README.md
└── .gitignore
```

## API Endpoints

`/` - Welcome message

`/api/auth` - Authentication routes
- `/api/auth/register` - User registration
- `/api/auth/login` - User login

`/api/materials` - Material routes
- GET: Fetch all materials
- POST: Create new material

`/api/admin` - Admin routes (protected)
- User management
- Material moderation

`/api/student-admin` - Student Admin routes (protected)
- Material upload
- Limited user management


## Authentication

The application uses JWT for authentication. Upon successful login, a token is generated and stored in the browser's local storage. This token is then sent with each API request to authenticate the user.

## File Upload

Files are uploaded to Cloudinary using their API. The upload process is handled on the server-side to ensure security. File references (URLs) are stored in the MongoDB database along with other material information.

## Deployment

The application is deployed on Vercel. The frontend and backend are deployed as different project.

To deploy your own instance:

1. Create a Vercel account and link it to your GitHub repository.
2. Set up the environment variables in the Vercel dashboard.
3. Deploy the application.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
