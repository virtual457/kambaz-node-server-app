import express from 'express';
import cors from 'cors';
import session from 'express-session';
import mongoose from 'mongoose';
import Hello from './Hello.js';
import Lab5 from './Lab5/index.js';
import CourseRoutes from './Kambaz/Courses/routes.js';
import ModuleRoutes from './Kambaz/Modules/routes.js';
import AssignmentRoutes from './Kambaz/Assignments/routes.js';
import UserRoutes from './Kambaz/Users/routes.js';
import Database from './Kambaz/Database/index.js';
import 'dotenv/config';

const CONNECTION_STRING = process.env.DATABASE_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kambaz"
mongoose.connect(CONNECTION_STRING);

const app = express();

// CORS configuration - allow Vercel preview deployments
const allowedOrigins = [
  process.env.CLIENT_URL,
  'http://localhost:3000',
  /https:\/\/.*\.vercel\.app$/
];

app.use(cors({
  credentials: true,
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    
    // Check if origin is in allowedOrigins
    const isAllowed = allowedOrigins.some(allowed => {
      if (typeof allowed === 'string') return allowed === origin;
      if (allowed instanceof RegExp) return allowed.test(origin);
      return false;
    });
    
    if (isAllowed) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

// Session configuration
const sessionOptions = {
  secret: process.env.SESSION_SECRET || 'kambaz-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
};

if (process.env.NODE_ENV === 'production') {
  sessionOptions.proxy = true;
  sessionOptions.cookie.sameSite = 'none';
}

app.use(session(sessionOptions));
app.use(express.json());

// Routes
Hello(app);
Lab5(app);
UserRoutes(app, Database);
CourseRoutes(app, Database);
ModuleRoutes(app, Database);
AssignmentRoutes(app, Database);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
