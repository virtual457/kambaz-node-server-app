import * as dao from './dao.js';

export default function EnrollmentRoutes(app, Database) {
  const findEnrollmentsForUser = (req, res) => {
    const { userId } = req.params;
    const enrollments = dao.findEnrollmentsForUser(userId);
    res.json(enrollments);
  };

  const findEnrollmentsForCourse = (req, res) => {
    const { courseId } = req.params;
    const enrollments = dao.findEnrollmentsForCourse(courseId);
    res.json(enrollments);
  };

  const enrollUserInCourse = (req, res) => {
    const { userId, courseId } = req.params;
    const enrollment = dao.enrollUserInCourse(userId, courseId);
    res.json(enrollment);
  };

  const unenrollUserFromCourse = (req, res) => {
    const { userId, courseId } = req.params;
    dao.unenrollUserFromCourse(userId, courseId);
    res.sendStatus(204);
  };

  app.get('/api/users/:userId/enrollments', findEnrollmentsForUser);
  app.get('/api/courses/:courseId/enrollments', findEnrollmentsForCourse);
  app.post('/api/users/:userId/courses/:courseId', enrollUserInCourse);
  app.delete('/api/users/:userId/courses/:courseId', unenrollUserFromCourse);
}
