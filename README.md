# Kambaz Node.js Server - Assignment 5

Full-stack Learning Management System backend built with Node.js, Express, and RESTful APIs.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation
```bash
npm install
```

### Running the Server

**Development Mode** (with auto-reload):
```bash
npm run dev
```

**Production Mode**:
```bash
npm start
```

Server runs on: **http://localhost:4000**

## 📚 API Endpoints

### Lab 5 - Learning Exercises

#### Path Parameters
- `GET /lab5/add/:a/:b` - Add two numbers
- `GET /lab5/subtract/:a/:b` - Subtract two numbers  
- `GET /lab5/multiply/:a/:b` - Multiply two numbers
- `GET /lab5/divide/:a/:b` - Divide two numbers

#### Query Parameters
- `GET /lab5/calculator?operation=add&a=5&b=3` - Calculator (add, subtract, multiply, divide)

#### Working with Objects
- `GET /lab5/assignment` - Get assignment object
- `GET /lab5/assignment/title` - Get assignment title
- `GET /lab5/assignment/title/:newTitle` - Update assignment title
- `GET /lab5/module` - Get module object
- `GET /lab5/module/name` - Get module name
- `GET /lab5/module/name/:newName` - Update module name

#### Working with Arrays (Todos)
- `GET /lab5/todos` - Get all todos
- `GET /lab5/todos/:id` - Get todo by ID
- `GET /lab5/todos/completed/:completed` - Get todos by completion status
- `POST /lab5/todos` - Create new todo
- `PUT /lab5/todos/:id` - Update todo
- `DELETE /lab5/todos/:id` - Delete todo

### Kambaz Application APIs

#### Users / Account
- `POST /api/users/signin` - Sign in
- `POST /api/users/signup` - Create new account
- `POST /api/users/signout` - Sign out
- `GET /api/users/profile` - Get current user profile
- `GET /api/users` - Get all users
- `GET /api/users/:userId` - Get user by ID
- `PUT /api/users/:userId` - Update user
- `DELETE /api/users/:userId` - Delete user

#### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:courseId` - Get course by ID
- `POST /api/courses` - Create new course
- `PUT /api/courses/:courseId` - Update course
- `DELETE /api/courses/:courseId` - Delete course

#### Modules
- `GET /api/courses/:courseId/modules` - Get modules for a course
- `POST /api/courses/:courseId/modules` - Create module in course
- `PUT /api/modules/:moduleId` - Update module
- `DELETE /api/modules/:moduleId` - Delete module

#### Assignments
- `GET /api/courses/:courseId/assignments` - Get assignments for a course
- `POST /api/courses/:courseId/assignments` - Create assignment in course
- `PUT /api/assignments/:assignmentId` - Update assignment
- `DELETE /api/assignments/:assignmentId` - Delete assignment

#### Enrollments
- `GET /api/users/:userId/enrollments` - Get user's enrollments
- `GET /api/courses/:courseId/enrollments` - Get course enrollments
- `POST /api/users/:userId/courses/:courseId` - Enroll user in course
- `DELETE /api/users/:userId/courses/:courseId` - Unenroll user from course

## 🧪 Testing

### Test with cURL
```bash
# Test hello endpoint
curl http://localhost:4000/hello

# Test path parameters
curl http://localhost:4000/lab5/add/34/23

# Test query parameters
curl "http://localhost:4000/lab5/calculator?operation=add&a=34&b=23"

# Get all courses
curl http://localhost:4000/api/courses

# Get all users
curl http://localhost:4000/api/users
```

### Test Users
```json
{
  "username": "iron_man",
  "password": "stark123"
}
```

## 📁 Project Structure
```
kambaz-node-server-app/
├── Hello.js              # Test route
├── index.js             # Main server file
├── Lab5/               # Lab 5 exercises
│   ├── index.js
│   ├── PathParameters.js
│   ├── QueryParameters.js
│   ├── WorkingWithObjects.js
│   └── WorkingWithArrays.js
├── Kambaz/             # Kambaz application
│   ├── Database/       # JSON data files
│   ├── Users/          # User routes & DAO
│   ├── Courses/        # Course routes & DAO
│   ├── Modules/        # Module routes & DAO
│   ├── Assignments/    # Assignment routes & DAO
│   └── Enrollments/    # Enrollment routes & DAO
└── package.json
```

## ⚙️ Environment Variables

Create a `.env` file:
```
PORT=4000
CLIENT_URL=http://localhost:3000
SERVER_URL=localhost:4000
```

## 📝 Notes

- Data is stored **in-memory** and persists only while server is running
- Restarting the server resets all data to initial state from JSON files
- MongoDB integration coming in Assignment 6

## 🔗 Related

- Frontend React App: [kambaz-next-js](../kambaz-next-js)
- Assignment: Chapter 5 - Building RESTful Web APIs

## 👤 Author

Your Name - Section Number
