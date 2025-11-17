import Database from '../Database/index.js';

let { users } = Database;

export const createUser = (user) => {
  const newUser = { ...user, _id: Date.now().toString() };
  users = [...users, newUser];
  return newUser;
};

export const findAllUsers = () => users;

export const findUserById = (userId) => users.find((u) => u._id === userId);

export const findUserByUsername = (username) =>
  users.find((u) => u.username === username);

export const findUserByCredentials = (username, password) =>
  users.find((u) => u.username === username && u.password === password);

export const updateUser = (userId, user) => {
  users = users.map((u) => (u._id === userId ? user : u));
  return user;
};

export const deleteUser = (userId) => {
  users = users.filter((u) => u._id !== userId);
};
