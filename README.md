<a id="readme-top"></a>

<!-- PROJECT SHIELDS -->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">

  <h3 align="center">🚀 Kambaz Node.js Backend Server</h3>

  <p align="center">
    RESTful API backend for Kambaz Learning Management System built with Node.js, Express, and modern web technologies. Features comprehensive user authentication, course management, and real-time data synchronization.
    <br />
    <a href="https://github.com/virtual457/kambaz-node-server-app"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/virtual457/kambaz-node-server-app">View Demo</a>
    ·
    <a href="https://github.com/virtual457/kambaz-node-server-app/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    ·
    <a href="https://github.com/virtual457/kambaz-node-server-app/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#key-features">Key Features</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#api-documentation">API Documentation</a></li>
    <li><a href="#testing">Testing</a></li>
    <li><a href="#deployment">Deployment</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

Kambaz Node.js Backend Server is a comprehensive RESTful API built for the Kambaz Learning Management System. This server handles all backend operations including user authentication, course management, module organization, assignment distribution, and enrollment tracking. Built with Express.js and following RESTful principles, it provides a robust and scalable backend infrastructure for modern web applications.

The server implements industry-standard practices including CORS configuration, environment-based configuration, modular routing architecture, and Data Access Object (DAO) pattern for clean separation of concerns. It's designed to work seamlessly with the Next.js React frontend while maintaining the flexibility to integrate with other client applications.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Key Features

#### Lab 5 Learning Exercises
- **Path Parameters**: Arithmetic operations via URL paths (add, subtract, multiply, divide)
- **Query Parameters**: Calculator functionality with query strings
- **Object Manipulation**: Dynamic assignment and module updates
- **Array Operations**: Complete CRUD operations on todos with error handling

#### Kambaz Application APIs
- **User Authentication**: Secure signin/signup with session management
- **Course Management**: Full CRUD operations for courses
- **Module System**: Hierarchical module organization with lessons
- **Assignment Distribution**: Create, update, and delete assignments
- **Enrollment Tracking**: User-course enrollment relationships

#### Technical Features
- **RESTful Architecture**: Standard HTTP methods (GET, POST, PUT, DELETE)
- **CORS Enabled**: Cross-origin resource sharing for frontend integration
- **Environment Configuration**: Flexible deployment settings
- **Error Handling**: Comprehensive error responses with proper status codes
- **In-Memory Storage**: Fast data operations during development
- **Modular Design**: Clean separation of routes, DAOs, and database layer

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- [![Node.js][Node.js]][Node-url] - JavaScript runtime
- [![Express][Express.js]][Express-url] - Web application framework
- [![JavaScript][JavaScript]][JavaScript-url] - Programming language
- **CORS** - Cross-Origin Resource Sharing middleware
- **dotenv** - Environment variable management
- **UUID** - Unique identifier generation
- **Nodemon** - Development auto-reload

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

- Node.js (v18.0.0 or higher)
- npm (v8.0.0 or higher)
- Git

### Installation

1. Clone the repository
   ```sh
   git clone https://github.com/virtual457/kambaz-node-server-app.git
   ```

2. Navigate to the project directory
   ```sh
   cd kambaz-node-server-app
   ```

3. Install NPM packages
   ```sh
   npm install
   ```

4. Create environment file
   ```sh
   cp .env.example .env
   ```
   Or manually create `.env` with:
   ```
   PORT=4000
   CLIENT_URL=http://localhost:3000
   SERVER_URL=localhost:4000
   ```

5. Start development server
   ```sh
   npm run dev
   ```

6. Server runs at `http://localhost:4000`

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- API DOCUMENTATION -->
## API Documentation

### Base URL
```
Development: http://localhost:4000
Production: https://your-render-url.onrender.com
```

### Lab 5 Endpoints

#### Path Parameters
```http
GET /lab5/add/:a/:b           # Add two numbers
GET /lab5/subtract/:a/:b      # Subtract two numbers
GET /lab5/multiply/:a/:b      # Multiply two numbers
GET /lab5/divide/:a/:b        # Divide two numbers
```

**Example:**
```
GET /lab5/add/34/23
Response: "57"
```

#### Query Parameters
```http
GET /lab5/calculator?operation={op}&a={num1}&b={num2}
# Operations: add, subtract, multiply, divide
```

**Example:**
```
GET /lab5/calculator?operation=add&a=34&b=23
Response: "57"
```

#### Working with Objects
```http
GET  /lab5/assignment                    # Get assignment object
GET  /lab5/assignment/title              # Get assignment title
GET  /lab5/assignment/title/:newTitle    # Update title
GET  /lab5/module                        # Get module object
GET  /lab5/module/name                   # Get module name
GET  /lab5/module/name/:newName          # Update name
```

#### Working with Arrays (Todos)
```http
GET    /lab5/todos                       # Get all todos
GET    /lab5/todos/:id                   # Get todo by ID
GET    /lab5/todos/completed/:status     # Filter by completion
POST   /lab5/todos                       # Create new todo
PUT    /lab5/todos/:id                   # Update todo
DELETE /lab5/todos/:id                   # Delete todo
```

### Kambaz Application Endpoints

#### Users / Authentication
```http
POST   /api/users/signin              # Sign in user
POST   /api/users/signup              # Create new account
POST   /api/users/signout             # Sign out user
GET    /api/users/profile             # Get current user
GET    /api/users                     # Get all users
GET    /api/users/:userId             # Get user by ID
PUT    /api/users/:userId             # Update user
DELETE /api/users/:userId             # Delete user
```

**Signin Example:**
```json
POST /api/users/signin
Body: {
  "username": "iron_man",
  "password": "stark123"
}
```

#### Courses
```http
GET    /api/courses                   # Get all courses
GET    /api/courses/:courseId         # Get course by ID
POST   /api/courses                   # Create new course
PUT    /api/courses/:courseId         # Update course
DELETE /api/courses/:courseId         # Delete course
```

#### Modules
```http
GET    /api/courses/:courseId/modules # Get modules for course
POST   /api/courses/:courseId/modules # Create module
PUT    /api/modules/:moduleId         # Update module
DELETE /api/modules/:moduleId         # Delete module
```

#### Assignments
```http
GET    /api/courses/:courseId/assignments # Get assignments
POST   /api/courses/:courseId/assignments # Create assignment
PUT    /api/assignments/:assignmentId     # Update assignment
DELETE /api/assignments/:assignmentId     # Delete assignment
```

#### Enrollments
```http
GET    /api/users/:userId/enrollments          # User's enrollments
GET    /api/courses/:courseId/enrollments      # Course enrollments
POST   /api/users/:userId/courses/:courseId    # Enroll user
DELETE /api/users/:userId/courses/:courseId    # Unenroll user
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- TESTING -->
## Testing

### Automated Testing with Python

The project includes a comprehensive Python test suite:

```sh
# Install test dependencies
pip install -r requirements.txt

# Run tests
python test_backend.py
```

**Test Coverage:**
- ✅ Lab 5 exercises (18 tests)
- ✅ User authentication (4 tests)
- ✅ Course operations (3 tests)
- ✅ Module operations (2 tests)
- ✅ Assignment operations (2 tests)
- ✅ Enrollment operations (2 tests)

### Manual Testing

**Using cURL:**
```sh
curl http://localhost:4000/hello
curl http://localhost:4000/lab5/add/34/23
curl http://localhost:4000/api/courses
```

**Using Browser:**
Navigate to `http://localhost:4000/api/courses` to view all courses.

**Using Postman/Thunder Client:**
Import endpoints and test POST/PUT/DELETE operations.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- DEPLOYMENT -->
## Deployment

### Deploy to Render.com

1. Push code to GitHub
2. Create new Web Service on [Render.com](https://render.com)
3. Connect GitHub repository
4. Configure build settings:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add environment variables:
   - `SERVER_URL`: `your-app.onrender.com`
   - `CLIENT_URL`: `https://your-vercel-app.vercel.app`
6. Deploy!

### Environment Variables

```env
PORT=4000                                    # Server port
CLIENT_URL=http://localhost:3000             # Frontend URL
SERVER_URL=localhost:4000                    # Server URL (no protocol for Render)
```

**Production:**
- `CLIENT_URL`: Your Vercel deployment URL
- `SERVER_URL`: Your Render deployment URL (without https://)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->
## Roadmap

- [x] Lab 5 exercises implementation
- [x] User authentication and session management
- [x] Course CRUD operations
- [x] Module management
- [x] Assignment distribution
- [x] Enrollment tracking
- [ ] MongoDB integration (Chapter 6)
- [ ] Advanced authentication (JWT tokens)
- [ ] File upload support
- [ ] WebSocket for real-time updates
- [ ] Rate limiting and security enhancements
- [ ] API versioning
- [ ] Comprehensive logging system
- [ ] Performance monitoring

See the [open issues](https://github.com/virtual457/kambaz-node-server-app/issues) for a full list of proposed features and known issues.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow ES6+ JavaScript standards
- Use meaningful variable and function names
- Add comments for complex logic
- Test all endpoints before committing
- Update API documentation for new endpoints

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->
## Contact

Chandan Gowda K S - chandan.keelara@gmail.com

**Project Links:**
- Backend Repository: [https://github.com/virtual457/kambaz-node-server-app](https://github.com/virtual457/kambaz-node-server-app)
- Frontend Repository: [https://github.com/virtual457/kambaz-next-js](https://github.com/virtual457/kambaz-next-js)
- Live Demo: [Deployed on Render.com](#)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

Resources and tools that made this project possible:

* [Express.js Documentation](https://expressjs.com/) - Web framework
* [Node.js Documentation](https://nodejs.org/) - Runtime environment
* [Render.com](https://render.com/) - Deployment platform
* [MDN Web Docs](https://developer.mozilla.org/) - Web technology reference
* [REST API Tutorial](https://restfulapi.net/) - RESTful principles
* [Postman](https://www.postman.com/) - API testing tool
* [GitHub](https://github.com/) - Version control and collaboration
* [CS 5610 Web Development](https://johnguerra.co/classes/webDevelopment_fall_2024/) - Course materials

### Course Information

- **Course**: CS 5610 - Web Development
- **Section**: 02
- **Assignment**: Assignment 5 - RESTful Web APIs with Node.js & Express
- **Semester**: Fall 2025
- **Institution**: Northeastern University

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
[contributors-shield]: https://img.shields.io/github/contributors/virtual457/kambaz-node-server-app.svg?style=for-the-badge
[contributors-url]: https://github.com/virtual457/kambaz-node-server-app/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/virtual457/kambaz-node-server-app.svg?style=for-the-badge
[forks-url]: https://github.com/virtual457/kambaz-node-server-app/network/members
[stars-shield]: https://img.shields.io/github/stars/virtual457/kambaz-node-server-app.svg?style=for-the-badge
[stars-url]: https://github.com/virtual457/kambaz-node-server-app/stargazers
[issues-shield]: https://img.shields.io/github/issues/virtual457/kambaz-node-server-app.svg?style=for-the-badge
[issues-url]: https://github.com/virtual457/kambaz-node-server-app/issues
[license-shield]: https://img.shields.io/github/license/virtual457/kambaz-node-server-app.svg?style=for-the-badge
[license-url]: https://github.com/virtual457/kambaz-node-server-app/blob/master/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/chandan-gowda-k-s-765194186/
[Node.js]: https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white
[Node-url]: https://nodejs.org/
[Express.js]: https://img.shields.io/badge/express.js-404D59?style=for-the-badge&logo=express&logoColor=white
[Express-url]: https://expressjs.com/
[JavaScript]: https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black
[JavaScript-url]: https://www.javascript.com/
