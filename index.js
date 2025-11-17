import express from 'express';
import cors from 'cors';
import Hello from './Hello.js';
import Lab5 from './Lab5/index.js';
import CourseRoutes from './Kambaz/Courses/routes.js';
import ModuleRoutes from './Kambaz/Modules/routes.js';
import AssignmentRoutes from './Kambaz/Assignments/routes.js';
import UserRoutes from './Kambaz/Users/routes.js';
import EnrollmentRoutes from './Kambaz/Enrollments/routes.js';
import Database from './Kambaz/Database/index.js';
import 'dotenv/config';

const app = express();

// CORS configuration - allow multiple origins
const allowedOrigins = [
  'http://localhost:3000',
  'https://kambaz-next-js.vercel.app',
  process.env.CLIENT_URL,
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    
    // Check if origin is in allowed list or is a Vercel preview URL
    if (allowedOrigins.includes(origin) || origin.includes('vercel.app')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());

// Routes
Hello(app);
Lab5(app);
UserRoutes(app, Database);
CourseRoutes(app, Database);
ModuleRoutes(app, Database);
AssignmentRoutes(app, Database);
EnrollmentRoutes(app, Database);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
