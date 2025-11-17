import Database from '../Database/index.js';

let { enrollments } = Database;

export const findEnrollmentsForUser = (userId) =>
  enrollments.filter((enrollment) => enrollment.user === userId);

export const findEnrollmentsForCourse = (courseId) =>
  enrollments.filter((enrollment) => enrollment.course === courseId);

export const enrollUserInCourse = (userId, courseId) => {
  const newEnrollment = {
    _id: Date.now().toString(),
    user: userId,
    course: courseId,
  };
  enrollments = [...enrollments, newEnrollment];
  return newEnrollment;
};

export const unenrollUserFromCourse = (userId, courseId) => {
  enrollments = enrollments.filter(
    (enrollment) => !(enrollment.user === userId && enrollment.course === courseId)
  );
};
