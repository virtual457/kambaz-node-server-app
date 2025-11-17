import Database from '../Database/index.js';

let { assignments } = Database;

export const findAssignmentsForCourse = (courseId) =>
  assignments.filter((assignment) => assignment.course === courseId);

export const createAssignment = (assignment) => {
  const newAssignment = { ...assignment, _id: Date.now().toString() };
  assignments = [...assignments, newAssignment];
  return newAssignment;
};

export const deleteAssignment = (assignmentId) => {
  assignments = assignments.filter((assignment) => assignment._id !== assignmentId);
};

export const updateAssignment = (assignmentId, assignmentUpdates) => {
  assignments = assignments.map((assignment) =>
    assignment._id === assignmentId ? { ...assignment, ...assignmentUpdates } : assignment
  );
  return assignments.find((assignment) => assignment._id === assignmentId);
};
