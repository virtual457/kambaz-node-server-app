import AssignmentsDao from './dao.js';

export default function AssignmentRoutes(app, db) {
  const dao = AssignmentsDao(db);

  // Anyone authenticated can view assignments
  const findAssignmentsForCourse = async (req, res) => {
    const { courseId } = req.params;
    const assignments = await dao.findAssignmentsForCourse(courseId);
    res.json(assignments);
  };

  // Only FACULTY or ADMIN can create assignments
  const createAssignment = async (req, res) => {
    const { courseId } = req.params;
    const assignment = {
      ...req.body,
      course: courseId,
    };
    const newAssignment = await dao.createAssignment(assignment);
    res.json(newAssignment);
  };

  // Only FACULTY or ADMIN can delete assignments
  const deleteAssignment = async (req, res) => {
    const { assignmentId } = req.params;
    await dao.deleteAssignment(assignmentId);
    res.sendStatus(204);
  };

  // Only FACULTY or ADMIN can update assignments
  const updateAssignment = async (req, res) => {
    const { assignmentId } = req.params;
    const status = await dao.updateAssignment(assignmentId, req.body);
    res.json(status);
  };

  app.get('/api/courses/:courseId/assignments', findAssignmentsForCourse);
  app.post('/api/courses/:courseId/assignments', createAssignment);
  app.delete('/api/assignments/:assignmentId', deleteAssignment);
  app.put('/api/assignments/:assignmentId', updateAssignment);
}
