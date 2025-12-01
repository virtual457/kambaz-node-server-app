import CoursesDao from './dao.js';
import EnrollmentsDao from '../Enrollments/dao.js';

export default function CourseRoutes(app, db) {
  const dao = CoursesDao(db);
  const enrollmentsDao = EnrollmentsDao(db);

  const findAllCourses = async (req, res) => {
    const courses = await dao.findAllCourses();
    res.json(courses);
  };

  const findCourseById = async (req, res) => {
    const { courseId } = req.params;
    const course = await dao.findCourseById(courseId);
    res.json(course);
  };

  const findCoursesForEnrolledUser = async (req, res) => {
    let { userId } = req.params;
    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }
    const courses = await enrollmentsDao.findCoursesForUser(userId);
    res.json(courses);
  };

  const findUsersForCourse = async (req, res) => {
    const { cid } = req.params;
    const users = await enrollmentsDao.findUsersForCourse(cid);
    res.json(users);
  };

  const createCourse = async (req, res) => {
    try {
      const course = await dao.createCourse(req.body);
      const currentUser = req.session["currentUser"];
      if (currentUser) {
        try {
          await enrollmentsDao.enrollUserInCourse(currentUser._id, course._id);
        } catch (enrollError) {
          // Ignore duplicate enrollment error
          console.log("Enrollment already exists or error:", enrollError);
        }
      }
      res.json(course);
    } catch (error) {
      console.error("Error creating course:", error);
      res.status(500).json({ error: "Failed to create course" });
    }
  };

  const updateCourse = async (req, res) => {
    const { courseId } = req.params;
    const status = await dao.updateCourse(courseId, req.body);
    res.json(status);
  };

  const deleteCourse = async (req, res) => {
    const { courseId } = req.params;
    await enrollmentsDao.unenrollAllUsersFromCourse(courseId);
    const status = await dao.deleteCourse(courseId);
    res.json(status);
  };

  const enrollUserInCourse = async (req, res) => {
    try {
      let { uid, cid } = req.params;
      if (uid === "current") {
        const currentUser = req.session["currentUser"];
        uid = currentUser._id;
      }
      const status = await enrollmentsDao.enrollUserInCourse(uid, cid);
      res.json(status);
    } catch (error) {
      if (error.code === 11000) {
        res.status(400).json({ error: "Already enrolled" });
      } else {
        res.status(500).json({ error: "Enrollment failed" });
      }
    }
  };

  const unenrollUserFromCourse = async (req, res) => {
    let { uid, cid } = req.params;
    if (uid === "current") {
      const currentUser = req.session["currentUser"];
      uid = currentUser._id;
    }
    const status = await enrollmentsDao.unenrollUserFromCourse(uid, cid);
    res.json(status);
  };

  app.get('/api/courses', findAllCourses);
  app.get('/api/courses/:courseId', findCourseById);
  app.get('/api/users/:userId/courses', findCoursesForEnrolledUser);
  app.get('/api/courses/:cid/users', findUsersForCourse);
  app.post('/api/courses', createCourse);
  app.put('/api/courses/:courseId', updateCourse);
  app.delete('/api/courses/:courseId', deleteCourse);
  app.post('/api/users/:uid/courses/:cid', enrollUserInCourse);
  app.delete('/api/users/:uid/courses/:cid', unenrollUserFromCourse);
}
