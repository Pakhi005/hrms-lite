# HRMS Lite

A lightweight Human Resource Management System built with **Next.js**, **Tailwind CSS**, and **SQLite**.

## Features
- **Employee Management**: Add, View, Delete employees.
- **Attendance Tracking**: Mark daily attendance (Present/Absent).
- **Dashboard**: Quick summary of total employees and daily attendance.
- **Responsive Design**: Professional UI that works on desktop and mobile.

## Tech Stack
- **Frontend**: Next.js 14+ (App Router), React, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: SQLite (using `better-sqlite3`)

## Getting Started

### Prerequisites
- Node.js 18+ installed

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/yourusername/hrms-lite.git
    cd hrms-lite
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Run the development server:
    ```bash
    npm run dev
    ```

4.  Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database
The application uses a local SQLite database file `hrms.db` which is automatically created in the root directory upon the first API request.

## API Endpoints
- `GET /api/employees`: List all employees
- `POST /api/employees`: Create a new employee
- `DELETE /api/employees/:id`: Delete an employee
- `GET /api/attendance`: Get attendance records
- `POST /api/attendance`: Mark attendance

## Deployment
This project is ready for deployment on platforms that support Node.js and persistent storage (for SQLite).
**Note**: Vercel Serverless Functions do *not* support persistent local SQLite files. For Vercel deployment, switch the database provider to PostgreSQL (e.g., Supabase or Neon) in `lib/db.js` or use a cloud database.

For a demo/test deployment, you can use **Render** or simply run it on a VPS.
