# 🛠️ MERN Stack Admin & Agent Management System

Welcome to the **MERN Stack Admin & Agent Management System**! This project is a full-stack web application that allows an admin user to manage agents, upload and distribute tasks from CSV files, and ensure smooth data handling.

---

## 🚀 Features

✅ **Admin Authentication**: Secure login system using JWT authentication.  
✅ **Agent Management**: Admin can add, edit, and delete agents.  
✅ **CSV Upload & Distribution**: Upload CSV files and distribute tasks evenly among agents.  
✅ **Data Validation**: Ensures CSV file format correctness before processing.  
✅ **MongoDB Integration**: Persistent data storage for users, agents, and tasks.  
✅ **Protected Routes**: Ensures authorized access to sensitive pages.  
✅ **Error Handling**: Proper validation and feedback for smooth user experience.  

---

## 🏗️ Project Structure

📦 **Project Root**  
│  
├── 📂 **backend**  
│   ├── **index.js** _(Main backend server - Express.js)_  
│   ├── **Routes/** _(Auth, Product, Agent, Upload handlers)_  
│   ├── **Models/** _(Database schemas - MongoDB)_  
│   ├── **Controllers/** _(Business logic)_  
│   ├── **Middleware/** _(Authentication, validation)_  
│   ├── **.env** _(Environment variables - Keep secrets here)_  
│  
├── 📂 **frontend**  
│   ├── **src/** _(React + React Router Pages & Components)_  
│   │   ├── **pages/** _(Login, Signup, Home, AddAgent, UploadCSV)_  
│   │   ├── **components/** _(Reusable UI components)_  
│   │   ├── **App.js** _(Routing & Authentication logic)_  
│   │   ├── **RefrshHandler.js** _(Session management)_  
│   ├── **public/** _(Static assets like images, icons)_  
│   ├── **App.css** _(Global styles)_  
│  
└── **README.md** _(Project documentation)_  

---

## 🛠️ Tech Stack

- **Frontend**: React.js, React Router, Tailwind CSS  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB (Mongoose ORM)  
- **Authentication**: JSON Web Tokens (JWT)  
- **State Management**: React useState + Context API  
- **Security**: bcrypt.js (password hashing), dotenv (secure env variables)  
- **Deployment**: Frontend - Vercel | Backend - Railway / Render  

---

## 🎯 Functionality

### **1️⃣ Admin Authentication**
- Secure JWT-based authentication.
- Login & Signup with email and password.
- Redirects to dashboard upon successful login.

### **2️⃣ Agent Management**
- Add new agents with details:
  - Name
  - Email
  - Phone Number
  - Password (hashed)
- View & manage the list of agents.

### **3️⃣ CSV Upload & Distribution**
- Upload CSV files containing task details.
- Validate file format (only CSV, XLSX, XLS allowed).
- Evenly distribute tasks among available agents.
- Store assigned tasks in MongoDB.

---

## 🏗️ Installation Guide

### **1️⃣ Clone the Repository**
```bash
https://github.com/your-github-username/admin-agent-management.git
cd admin-agent-management
```

### **2️⃣ Setup Backend**
```bash
cd backend
npm install
```
Create a `.env` file and add the following:
```env
PORT=3001
MONGO_CONN="your-mongodb-connection-string"
JWT_SECRET="your-secret-key"
```
Run the backend server:
```bash
npm start
```

### **3️⃣ Setup Frontend**
```bash
cd frontend
npm install
npm start
```
The frontend should now be accessible at `http://localhost:3000/`

---

## 📜 API Endpoints

### **Authentication**
| Method | Endpoint      | Description        |
|--------|-------------|------------------|
| POST   | `/auth/login`  | Admin login      |
| POST   | `/auth/signup` | Admin signup     |

### **Agents**
| Method | Endpoint        | Description            |
|--------|----------------|------------------------|
| GET    | `/agent/all`     | Get all agents        |
| POST   | `/agent/add`     | Add new agent        |
| DELETE | `/agent/:id`    | Remove an agent       |

### **CSV Upload & Task Distribution**
| Method | Endpoint        | Description             |
|--------|----------------|-------------------------|
| POST   | `/upload/csv`   | Upload & distribute CSV |
| GET    | `/tasks/all`    | Fetch assigned tasks   |

---

## 🎥 Demo Video
A working demonstration of the project can be found [here](https://drive.google.com/your-demo-video-link).

---

## 📌 Future Improvements
✅ Implement Role-Based Access Control (RBAC)  
✅ UI/UX Improvements with Material UI / Tailwind CSS  
✅ Email Notifications for task assignments  
✅ Bulk Edit & Delete for Agents  
✅ Graphs & Analytics Dashboard  

---

## 📝 License
This project is open-source and available under the **MIT License**.

---

🚀 **Happy Coding!**
