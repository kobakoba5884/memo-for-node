import express from "express";
import next from 'next'
import { endpoint, PORT, serverUrl } from "./constants.js";

let todos = [
  { id: 1, title: "Name", completed: false },
  { id: 2, title: "subject", completed: true },
];

const app = express();

app.use(express.json());

app.get(endpoint, (req, res, next) => {
  console.log("req.query", req.query);
  const completed = req.query.completed;
  console.log("completed", completed);

  if (!completed) {
    return res.json(todos);
  }

  if(completed !== 'true' && completed !== 'false'){
    const err = new Error("completed property is boolean.");
    err.statusCode = 400;
    return next(err);
  }

  let convertedCompleted = completed === 'true'
  res.json(todos.filter((todo) => todo.completed === convertedCompleted));
});

app.post(endpoint, (req, res, next) => {
  const { title } = req.body;
  let id = todos.length;

  if (typeof title !== "string" || !title) {
    const err = new Error("title is required");
    err.statusCode = 400;
    return next(err);
  }

  const todo = {
    id: (id += 1),
    title,
    completed: false,
  };

  todos.push(todo);

  res.status(201).json(todo);
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.statusCode || 500).json({ error: err.message });
});

app.listen(PORT, () => {
  console.log(`🚀server is up and run at ${serverUrl}`);
});

const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })

nextApp.prepare().then(
  () => app.get('*', nextApp.getRequestHandler()),
  err => {
    console.log(err)
    process.exit(1)
  }
)
