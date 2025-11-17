<a id="readme-top"></a>

<!-- PROJECT SHIELDS -->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">

  <h3 align="center">🎓 Kambaz Learning Management System - Backend API</h3>

  <p align="center">
    Enterprise-grade RESTful API backend for a comprehensive Learning Management System. Built with Node.js and Express, featuring user authentication, course management, real-time data synchronization, and scalable architecture for educational platforms.
    <br />
    <a href="https://github.com/virtual457/kambaz-node-server-app"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://kambaz-node-server-app-irwy.onrender.com">View Demo</a>
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
        <li><a href="#key-features">Key Features</a></li>
        <li><a href="#built-with">Built With</a></li>
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
    <li><a href="#architecture">Architecture</a></li>
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

Kambaz Backend is a robust, production-ready RESTful API server designed to power modern Learning Management Systems. Built with scalability and maintainability in mind, it provides a comprehensive backend infrastructure for educational platforms, handling everything from user authentication to complex course hierarchies and enrollment management.

The API follows industry best practices including RESTful design principles, modular architecture, proper error handling, and secure session management. It's designed to seamlessly integrate with frontend applications while maintaining clear separation of concerns and providing a clean, intuitive interface for client applications.

### Why This Project?

Learning Management Systems are complex applications requiring careful handling of user data, course structures, content delivery, and progress tracking. This backend demonstrates:

- **Scalable Architecture**: Modular design that grows with your application
- **Security First**: Proper authentication and session management
- **Developer Friendly**: Clear API contracts and comprehensive documentation
- **Production Ready**: Deployed on Render with environment-based configuration
- **Well Tested**: Automated test suite ensuring reliability

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Key Features

#### Core Functionality
- 🔐 **User Authentication & Authorization**: Secure signup, signin, and session management
- 📚 **Course Management**: Complete CRUD operations for course creation and management
- 📖 **Module Organization**: Hierarchical content structure with lessons
- 📝 **Assignment Distribution**: Create, update, and track student assignments
- 👥 **Enrollment System**: Manage user-course relationships and access control

#### Technical Highlights
- **RESTful API Design**: Standard HTTP methods following REST principles
- **Modular Architecture**: Clean separation using DAO pattern
- **CORS Configuration**: Secure cross-origin resource sharing
- **Environment Management**: Flexible configuration for multiple environments
- **Error Handling**: Comprehensive error responses with proper HTTP status codes
- **Data Validation**: Request validation and sanitization
- **Scalable Structure**: Easy to extend with new features

#### Developer Experience
- **Comprehensive Documentation**: Detailed API reference and examples
- **Automated Testing**: Python test suite for all endpoints
- **Hot Reload**: Development server with auto-restart
- **Clear Code Structure**: Well-organized files and consistent naming
- **Type Safety Ready**: Prepared for TypeScript migration

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

* [![Node.js][Node.js]][Node-url] - JavaScript runtime environment
* [![Express][Express.js]][Express-url] - Fast, minimalist web framework
* [![JavaScript][JavaScript]][JavaScript-url] - Programming language
* **CORS** - Secure cross-origin resource sharing
* **dotenv** - Environment variable management
* **UUID** - Unique identifier generation
* **Nodemon** - Development workflow enhancement

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

* Node.js (v18.0.0 or higher)
  ```sh
  node --version
  ```
* npm (v8.0.0 or higher)
  ```sh
  npm --version
  ```

### Installation

1. Clone the repository
   ```sh
   git clone https://github.com/virtual457/kambaz-node-server-app.git
   ```

2. Navigate to the project directory
   ```sh
   cd kambaz-node-server-app
   ```

3. Install dependencies
   ```sh
   npm install
   ```

4. Create environment configuration
   ```sh
   cp .env.example .env
   ```
   
   Configure your `.env` file:
   ```env
   PORT=4000
   CLIENT_URL=http://localhost:3000
   SERVER_URL=localhost:4000
   ```

5. Start the development server
   ```sh
   npm run dev
   ```

6. Server will be running at `http://localhost:4000`

7. Test the connection
   ```sh
   curl http://localhost:4000/hello
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- API DOCUMENTATION -->
## API Documentation

### Base URL
```
Development: http://localhost:4000
Production: https://kambaz-node-server-app-irwy.onrender.com
```

### Authentication Endpoints

#### Sign In
```http
POST /api/users/signin
Content-Type: application/json

{
  "username": "user@example.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "_id": "123",
  "username": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "role": "STUDENT"
}
```

#### Sign Up
```http
POST /api/users/signup
Content-Type: application/json

{
  "username": "newuser",
  "password": "password123",
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane@example.com",
  "role": "STUDENT"
}
```

#### Get Profile
```http
GET /api/users/profile
```

#### Update Profile
```http
PUT /api/users/:userId
Content-Type: application/json

{
  "firstName": "Updated",
  "lastName": "Name",
  "email": "newemail@example.com"
}
```

#### Sign Out
```http
POST /api/users/signout
```

### Course Management

#### Get All Courses
```http
GET /api/courses
```

**Response:**
```json
[
  {
    "_id": "1234",
    "name": "Introduction to Computer Science",
    "number": "CS101",
    "department": "Computer Science",
    "credits": 4,
    "description": "Fundamental concepts of computer science"
  }
]
```

#### Get Course by ID
```http
GET /api/courses/:courseId
```

#### Create Course
```http
POST /api/courses
Content-Type: application/json

{
  "name": "Advanced Web Development",
  "number": "CS550",
  "department": "Computer Science",
  "credits": 4,
  "description": "Modern web technologies and frameworks"
}
```

#### Update Course
```http
PUT /api/courses/:courseId
Content-Type: application/json
```

#### Delete Course
```http
DELETE /api/courses/:courseId
```

### Module Management

#### Get Modules for Course
```http
GET /api/courses/:courseId/modules
```

#### Create Module
```http
POST /api/courses/:courseId/modules
Content-Type: application/json

{
  "name": "Week 1: Introduction",
  "description": "Course overview and setup"
}
```

#### Update Module
```http
PUT /api/modules/:moduleId
```

#### Delete Module
```http
DELETE /api/modules/:moduleId
```

### Assignment Management

#### Get Assignments for Course
```http
GET /api/courses/:courseId/assignments
```

#### Create Assignment
```http
POST /api/courses/:courseId/assignments
Content-Type: application/json

{
  "title": "Homework 1",
  "description": "Complete the reading",
  "points": 100,
  "dueDate": "2024-12-31"
}
```

#### Update Assignment
```http
PUT /api/assignments/:assignmentId
```

#### Delete Assignment
```http
DELETE /api/assignments/:assignmentId
```

### Enrollment Management

#### Get User Enrollments
```http
GET /api/users/:userId/enrollments
```

#### Get Course Enrollments
```http
GET /api/courses/:courseId/enrollments
```

#### Enroll User in Course
```http
POST /api/users/:userId/courses/:courseId
```

#### Unenroll User from Course
```http
DELETE /api/users/:userId/courses/:courseId
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ARCHITECTURE -->
## Architecture

### Project Structure
```
kambaz-node-server-app/
├── index.js                 # Main application entry point
├── Hello.js                 # Health check endpoint
├── Lab5/                    # Demo & learning endpoints
│   ├── index.js
│   ├── PathParameters.js    # URL path parameter handling
│   ├── QueryParameters.js   # Query string parameter handling
│   ├── WorkingWithObjects.js # Object manipulation demos
│   └── WorkingWithArrays.js  # Array CRUD operations
├── Kambaz/                  # Main application
│   ├── Database/            # Data layer
│   │   ├── index.js
│   │   ├── courses.json
│   │   ├── modules.json
│   │   ├── assignments.json
│   │   ├── users.json
│   │   └── enrollments.json
│   ├── Users/               # User management
│   │   ├── routes.js        # HTTP endpoints
│   │   └── dao.js          # Data access layer
│   ├── Courses/            # Course management
│   │   ├── routes.js
│   │   └── dao.js
│   ├── Modules/            # Module management
│   │   ├── routes.js
│   │   └── dao.js
│   ├── Assignments/        # Assignment management
│   │   ├── routes.js
│   │   └── dao.js
│   └── Enrollments/        # Enrollment tracking
│       ├── routes.js
│       └── dao.js
└── package.json
```

### Design Patterns

#### Data Access Object (DAO) Pattern
Separates business logic from data access:
- **Routes**: Handle HTTP requests/responses
- **DAOs**: Manage data operations
- **Database**: Abstracted data storage

#### Modular Routing
Each feature domain has its own route module:
- Clean separation of concerns
- Easy to test and maintain
- Scalable architecture

#### Middleware Pipeline
```
Request → CORS → JSON Parser → Routes → Response
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- TESTING -->
## Testing

### Automated Test Suite

Comprehensive Python-based test automation:

```bash
# Install test dependencies
pip install -r requirements.txt

# Test local server
python test_backend.py

# Test production server
python test_backend.py --url https://kambaz-node-server-app-irwy.onrender.com

# Verbose output
python test_backend.py --verbose
```

**Test Coverage:**
- ✅ Path parameter handling (4 tests)
- ✅ Query parameter parsing (4 tests)
- ✅ Object manipulation (5 tests)
- ✅ Array operations (5 tests)
- ✅ User authentication (4 tests)
- ✅ Course CRUD (3 tests)
- ✅ Module CRUD (2 tests)
- ✅ Assignment CRUD (2 tests)
- ✅ Enrollment management (2 tests)

**Total: 31 automated tests**

### Manual Testing

#### Using cURL
```bash
# Health check
curl http://localhost:4000/hello

# Get all courses
curl http://localhost:4000/api/courses

# Create course
curl -X POST http://localhost:4000/api/courses \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Course","number":"TEST101","credits":3}'
```

#### Using Browser
Navigate to:
- `http://localhost:4000/api/courses` - View all courses
- `http://localhost:4000/api/users` - View all users

#### Using API Testing Tools
Import endpoints into Postman, Insomnia, or Thunder Client for comprehensive testing.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- DEPLOYMENT -->
## Deployment

### Production Deployment on Render

**Live API:** https://kambaz-node-server-app-irwy.onrender.com

#### Deploy Your Own Instance

1. **Fork the repository**

2. **Create account on Render.com**

3. **Create new Web Service**
   - Connect GitHub repository
   - Select Node environment
   - Build Command: `npm install`
   - Start Command: `npm start`

4. **Configure Environment Variables**
   ```
   SERVER_URL=your-app.onrender.com
   CLIENT_URL=https://your-frontend-url.com
   ```

5. **Deploy**
   - Automatic deployments on git push
   - Zero-downtime updates
   - Free tier available

### Environment Configuration

#### Development
```env
PORT=4000
CLIENT_URL=http://localhost:3000
SERVER_URL=localhost:4000
```

#### Production
```env
PORT=4000
CLIENT_URL=https://your-production-frontend.com
SERVER_URL=your-app.onrender.com
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->
## Roadmap

### Current Features
- [x] RESTful API with Express.js
- [x] User authentication and session management
- [x] Course CRUD operations
- [x] Module hierarchy management
- [x] Assignment distribution system
- [x] Enrollment tracking
- [x] CORS configuration for frontend integration
- [x] Automated testing suite
- [x] Production deployment on Render

### Future Enhancements
- [ ] **Database Integration**: Migrate to MongoDB for persistent storage
- [ ] **JWT Authentication**: Token-based auth for better security
- [ ] **File Upload**: Support for course materials and assignments
- [ ] **Real-time Updates**: WebSocket integration for live notifications
- [ ] **Advanced Search**: Full-text search across courses and content
- [ ] **Analytics Dashboard**: Usage statistics and performance metrics
- [ ] **Rate Limiting**: API throttling for abuse prevention
- [ ] **Caching Layer**: Redis integration for improved performance
- [ ] **Email Notifications**: Assignment reminders and updates
- [ ] **Grade Management**: Gradebook and assessment tracking
- [ ] **Discussion Forums**: Real-time collaboration features
- [ ] **Video Integration**: Support for lecture recordings
- [ ] **API Versioning**: Backward compatibility management
- [ ] **Microservices**: Split into domain-specific services
- [ ] **GraphQL Endpoint**: Alternative to REST for flexible queries

See the [open issues](https://github.com/virtual457/kambaz-node-server-app/issues) for a full list of proposed features and known issues.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow JavaScript ES6+ best practices
- Write self-documenting code with clear variable names
- Add comprehensive error handling
- Update tests for new features
- Keep API documentation current
- Follow RESTful principles

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->
## Contact

**Chandan Gowda K S**

📧 Email: chandan.keelara@gmail.com  
💼 LinkedIn: [linkedin.com/in/chandan-gowda-k-s-765194186](https://www.linkedin.com/in/chandan-gowda-k-s-765194186/)  
🐙 GitHub: [@virtual457](https://github.com/virtual457)

**Project Links:**
- Backend API: [https://github.com/virtual457/kambaz-node-server-app](https://github.com/virtual457/kambaz-node-server-app)
- Frontend App: [https://github.com/virtual457/kambaz-next-js](https://github.com/virtual457/kambaz-next-js)
- Live Demo: [https://kambaz-node-server-app-irwy.onrender.com](https://kambaz-node-server-app-irwy.onrender.com)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

Technologies and resources that made this project possible:

* [Express.js](https://expressjs.com/) - Fast, unopinionated web framework
* [Node.js](https://nodejs.org/) - JavaScript runtime built on Chrome's V8
* [Render](https://render.com/) - Cloud platform for modern applications
* [REST API Design](https://restfulapi.net/) - RESTful principles and best practices
* [MDN Web Docs](https://developer.mozilla.org/) - Comprehensive web technology documentation
* [Postman](https://www.postman.com/) - API development and testing
* [Jest](https://jestjs.io/) - JavaScript testing framework
* [GitHub Actions](https://github.com/features/actions) - CI/CD automation
* [ESLint](https://eslint.org/) - JavaScript linting
* [Prettier](https://prettier.io/) - Code formatting

### Related Projects
- **Frontend Repository**: [Kambaz Next.js Client](https://github.com/virtual457/kambaz-next-js)
- **Live Application**: [Kambaz LMS](https://kambaz-next-js-git-a5-chandan-gowda-k-ss-projects.vercel.app)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

<div align="center">

### ⭐ Star this repo if you find it helpful!

Made with ❤️ by [Chandan Gowda K S](https://github.com/virtual457)

</div>

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
[Express.js]: https://img.shields.io/badge/express.js-000000?style=for-the-badge&logo=express&logoColor=white
[Express-url]: https://expressjs.com/
[JavaScript]: https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black
[JavaScript-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript
