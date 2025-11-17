import * as dao from './dao.js';

let currentUser = null;

export default function UserRoutes(app, Database) {
  const createUser = (req, res) => {
    const user = dao.createUser(req.body);
    res.json(user);
  };

  const deleteUser = (req, res) => {
    const status = dao.deleteUser(req.params.userId);
    res.json(status);
  };

  const findAllUsers = (req, res) => {
    const users = dao.findAllUsers();
    res.json(users);
  };

  const findUserById = (req, res) => {
    const user = dao.findUserById(req.params.userId);
    res.json(user);
  };

  const updateUser = (req, res) => {
    const { userId } = req.params;
    const status = dao.updateUser(userId, req.body);
    currentUser = req.body;
    res.json(status);
  };

  const signup = (req, res) => {
    const user = dao.findUserByUsername(req.body.username);
    if (user) {
      res.status(400).json({ message: 'Username already taken' });
      return;
    }
    const newUser = dao.createUser(req.body);
    currentUser = newUser;
    res.json(newUser);
  };

  const signin = (req, res) => {
    const { username, password } = req.body;
    const user = dao.findUserByCredentials(username, password);
    if (user) {
      currentUser = user;
      res.json(user);
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  };

  const signout = (req, res) => {
    currentUser = null;
    res.sendStatus(200);
  };

  const profile = (req, res) => {
    if (currentUser) {
      res.json(currentUser);
    } else {
      res.sendStatus(401);
    }
  };

  app.post('/api/users', createUser);
  app.get('/api/users', findAllUsers);
  app.get('/api/users/:userId', findUserById);
  app.put('/api/users/:userId', updateUser);
  app.delete('/api/users/:userId', deleteUser);
  app.post('/api/users/signup', signup);
  app.post('/api/users/signin', signin);
  app.post('/api/users/signout', signout);
  app.get('/api/users/profile', profile);
}
