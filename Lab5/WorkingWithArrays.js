let todos = [
  { id: 1, title: 'Task 1', completed: false },
  { id: 2, title: 'Task 2', completed: true },
  { id: 3, title: 'Task 3', completed: false },
  { id: 4, title: 'Task 4', completed: true },
];

export default function WorkingWithArrays(app) {
  // Get all todos
  app.get('/lab5/todos', (req, res) => {
    res.json(todos);
  });

  // Get todo by ID
  app.get('/lab5/todos/:id', (req, res) => {
    const { id } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    if (todo) {
      res.json(todo);
    } else {
      res.status(404).json({ message: `Todo with ID ${id} not found` });
    }
  });

  // Get completed todos
  app.get('/lab5/todos/completed/:completed', (req, res) => {
    const { completed } = req.params;
    const completedTodos = todos.filter(
      (t) => t.completed === (completed === 'true')
    );
    res.json(completedTodos);
  });

  // Create new todo
  app.post('/lab5/todos', (req, res) => {
    const newTodo = { ...req.body, id: new Date().getTime() };
    todos.push(newTodo);
    res.json(newTodo);
  });

  // Delete todo
  app.delete('/lab5/todos/:id', (req, res) => {
    const { id } = req.params;
    const todoIndex = todos.findIndex((t) => t.id === parseInt(id));
    if (todoIndex !== -1) {
      const deletedTodo = todos.splice(todoIndex, 1)[0];
      res.json(deletedTodo);
    } else {
      res.status(404).json({ message: `Unable to delete Todo with ID: ${id}` });
    }
  });

  // Update todo
  app.put('/lab5/todos/:id', (req, res) => {
    const { id } = req.params;
    const todoIndex = todos.findIndex((t) => t.id === parseInt(id));
    if (todoIndex !== -1) {
      todos[todoIndex] = { ...todos[todoIndex], ...req.body };
      res.json(todos[todoIndex]);
    } else {
      res.status(404).json({ message: `Unable to update Todo with ID: ${id}` });
    }
  });
}
