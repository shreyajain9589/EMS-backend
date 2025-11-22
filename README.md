🚀 Employee Management System (EMS) – Backend

This is the backend API for the Employee Management System (EMS) built using Node.js, Express, MongoDB & JWT Authentication.
It provides secure APIs for authentication, employee details, departments, and leave management.

| Technology             | Description           |
| ---------------------- | --------------------- |
| **Node.js**            | Server runtime        |
| **Express.js**         | Backend framework     |
| **MongoDB + Mongoose** | Database & ORM        |
| **JWT**                | Secure authentication |
| **BCrypt**             | Password hashing      |
| **CORS**               | API security          |

⚙️ Features

🔐 JWT Auth (Login)

👤 Role-based access (Admin / Manager / Employee)

👥 Employee CRUD Management

🏢 Department CRUD Management

📝 Apply Leave, Approve / Reject Leave

📅 Personal & All Leaves View

🛡 Protected routes with middleware

ems-backend
│── controllers
│── middleware
│── models
│── routes
│── config
│── server.js
│── package.json
│── .env (ignored)
│── README.md

🔑 Environment Variables

Create a .env file inside backend root:
PORT=5000
MONGO_URI=your-mongo-url
JWT_SECRET=your-secret-key
🚀 Setup & Run Locally
Install dependencies
npm install

Start development server
npm run dev

Server will run on:
http://localhost:5000

🧪 API Endpoints
Auth
| Method | Endpoint          | Description |
| ------ | ----------------- | ----------- |
| POST   | `/api/auth/login` | Login user  |
{
  "Authorization": "Bearer <token>"
}


Employees
| Method | Endpoint             | Description       |
| ------ | -------------------- | ----------------- |
| GET    | `/api/employees`     | Get all employees |
| POST   | `/api/employees`     | Create employee   |
| PUT    | `/api/employees/:id` | Update employee   |
| DELETE | `/api/employees/:id` | Delete employee   |

Leaves
| Method | Endpoint                  | Description                    |
| ------ | ------------------------- | ------------------------------ |
| POST   | `/api/leaves`             | Apply for leave                |
| GET    | `/api/leaves`             | Get all leaves (Admin/Manager) |
| GET    | `/api/leaves/user/:id`    | Get leaves of single employee  |
| PUT    | `/api/leaves/:id/approve` | Approve leave                  |
| PUT    | `/api/leaves/:id/reject`  | Reject leave                   |

🧿 Authorization

Example header required for protected routes:
{
  "Authorization": "Bearer <token>"
}
📦 Deployment
Build & Start Production
npm run build
npm start
Deploy on:

Render

Railway

Heroku

AWS / Azure
