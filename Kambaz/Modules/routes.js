import * as dao from './dao.js';

export default function ModuleRoutes(app, Database) {
  const findModulesForCourse = (req, res) => {
    const { courseId } = req.params;
    const modules = dao.findModulesForCourse(courseId);
    res.json(modules);
  };

  const createModule = (req, res) => {
    const { courseId } = req.params;
    const module = {
      ...req.body,
      course: courseId,
    };
    const newModule = dao.createModule(module);
    res.json(newModule);
  };

  const deleteModule = (req, res) => {
    const { moduleId } = req.params;
    dao.deleteModule(moduleId);
    res.sendStatus(204);
  };

  const updateModule = (req, res) => {
    const { moduleId } = req.params;
    const status = dao.updateModule(moduleId, req.body);
    res.json(status);
  };

  app.get('/api/courses/:courseId/modules', findModulesForCourse);
  app.post('/api/courses/:courseId/modules', createModule);
  app.delete('/api/modules/:moduleId', deleteModule);
  app.put('/api/modules/:moduleId', updateModule);
}
