const e = require("express");
const express = require("express");

const app = express();
const port = 5000;

app.use(express.json());

let todos = [
  { id: 1, task: "shop", completed: false },
  { id: 2, task: "code", completed: false },
  { id: 3, task: "sleep", completed: false },
  { id: 4, task: "eat", completed: false },
  { id: 5, task: "workout", completed: false },
];

let idCounter = todos.length;

// GET //

// Get all todos with ID query
app.get("/todos", (req, res) => {
  const id = req.query.id;

  if (id) {
    const newTodos = todos.filter((todo) => {
      return todo.id == id;
    });
    res.status(200);
    res.json(newTodos);
  } else {
    res.status(200);
    res.json(todos);
  }
});

// Get todo with ID params
app.get("/todos/:id", (req, res) => {
  const todo = todos.find((todo) => todo.id == req.params.id);

  if (todo){
    res.status(200);
    res.json(todo);
  } else {
    res.status(404);
    res.json("Not Found");
  }

});

// Get todos that are completed
app.get("/todos_completed", (req, res) => {
  const newTodos = todos.filter((todo) => todo.completed == true);

  if (newTodos.length){
    res.status(200);
    res.json(newTodos);
  } else {
    res.status(404);
    res.json("Nothing Found");
  }

});

// Get todos that are uncompleted
app.get("/todos_uncompleted", (req, res) => {
  const newTodos = todos.filter((todo) => todo.completed == false);

  if (newTodos.length){
    res.status(200);
    res.json(newTodos);
  } else {
    res.status(404);
    res.json("Nothing Found");
  }

});

// POST //

app.post("/todos/create", (req, res) => {
  todos.push({
    id: ++idCounter,
    task: req.body.task,
    completed: false,
  });
  res.status(200);
  res.json(todos);
});

//  UPDATE //

// Update all todos to completed
app.put("/todos/set_all_completed", (req, res) => {
  todos.forEach((todo) => (todo.completed = true));
  res.status(200);
  res.json(todos);
});

// Update all todos to uncompleted
app.put("/todos/set_all_uncompleted", (req, res) => {
  todos.forEach((todo) => (todo.completed = false));
  res.status(200);
  res.json(todos);
});

// Update todo task
app.put("/todos/:id/update_task", (req, res) => {
  todos.forEach((todo) => {
    if (todo.id == req.params.id) {
      todo.task = req.body.task;
    }
  });
  res.status(200);
  res.json(todos);
});

// Update todo to completed
app.put("/todos/:id/set_completed", (req, res) => {
  todos.forEach((todo) => {
    if (todo.id == req.params.id) {
      todo.completed = true;
    }
  });
  res.status(200);
  res.json(todos);
});

// Update todo to uncompleted
app.put("/todos/:id/set_uncompleted", (req, res) => {
  todos.forEach((todo) => {
    if (todo.id == req.params.id) {
      todo.completed = false;
    }
  });
  res.status(200);
  res.json(todos);
});

// DELETE //

// Delete all todos
app.delete("/todos", (req, res) => {
  todos = [];
  res.status(200);
  res.json("All Todos Deleted");
});

// Delete todo with ID params
app.delete("/todos/:id", (req, res) => {
  const newTodos = todos.filter((todo) => todo.id != req.params.id);
  todos = newTodos;
  res.status(200);
  res.json(todos);
});

app.listen(port);
