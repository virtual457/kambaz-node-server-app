import Database from '../Database/index.js';

let { modules } = Database;

export const findModulesForCourse = (courseId) =>
  modules.filter((module) => module.course === courseId);

export const createModule = (module) => {
  const newModule = { ...module, _id: Date.now().toString() };
  modules = [...modules, newModule];
  return newModule;
};

export const deleteModule = (moduleId) => {
  modules = modules.filter((module) => module._id !== moduleId);
};

export const updateModule = (moduleId, moduleUpdates) => {
  modules = modules.map((module) =>
    module._id === moduleId ? { ...module, ...moduleUpdates } : module
  );
  return modules.find((module) => module._id === moduleId);
};
