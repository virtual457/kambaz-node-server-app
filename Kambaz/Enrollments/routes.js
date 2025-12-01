import EnrollmentsDao from './dao.js';

export default function EnrollmentRoutes(app, db) {
  const dao = EnrollmentsDao(db);

  const findEnrollmentsForUser = async (req, res) => {
    const { userId } = req.params;
    const enrollments = await dao.findEnrollmentsForUser(userId);
    res.json(enrollments);
  };

  const findEnrollmentsForCourse = async (req, res) => {
    const { courseId } = req.params;
    const enrollments = await dao.findEnrollmentsForCourse(courseId);
    res.json(enrollments);
  };

  const enrollUserInCourse = async (req, res) => {
    const { userId, courseId } = req.params;
    const enrollment = await dao.enrollUserInCourse(userId, courseId);
    res.json(enrollment);
  };

  const unenrollUserFromCourse = async (req, res) => {
    const { userId, courseId } = req.params;
    await dao.unenrollUserFromCourse(userId, courseId);
    res.sendStatus(204);
  };

  app.get('/api/users/:userId/enrollments', findEnrollmentsForUser);
  app.get('/api/courses/:courseId/enrollments', findEnrollmentsForCourse);
  app.post('/api/users/:userId/courses/:courseId', enrollUserInCourse);
  app.delete('/api/users/:userId/courses/:courseId', unenrollUserFromCourse);
}
