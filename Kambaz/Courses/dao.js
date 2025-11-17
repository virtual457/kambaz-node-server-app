import Database from '../Database/index.js';

let { courses } = Database;

export const findAllCourses = () => courses;

export const findCourseById = (courseId) => 
  courses.find((course) => course._id === courseId);

export const createCourse = (course) => {
  const newCourse = { ...course, _id: Date.now().toString() };
  courses = [...courses, newCourse];
  return newCourse;
};

export const updateCourse = (courseId, courseUpdates) => {
  courses = courses.map((course) =>
    course._id === courseId ? { ...course, ...courseUpdates } : course
  );
  return courses.find((course) => course._id === courseId);
};

export const deleteCourse = (courseId) => {
  courses = courses.filter((course) => course._id !== courseId);
};
