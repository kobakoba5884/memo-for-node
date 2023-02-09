import express from "express";
import { randomUUID } from "crypto";
import { endpoint, PORT, serverUrl } from "./constants.js";
import { create, fetchAll, fetchByCompleted, remove, update } from "./file-system/index.js";

const app = express();

app.use(express.json());

app.get(endpoint, (req, res, next) => {
  if (!req.query.completed) {
    return fetchAll().then((todos) => res.json(todos), next);
  }

  const completed = req.query.completed === "true";
  fetchByCompleted(completed);
  then((todos) => res.json(todos), next);
});

app.post(endpoint, (req, res, next) => {
  const { title } = req.body;

  if (typeof title !== "string" || !title) {
    const err = new Error("title is required");
    err.statusCode = 400;
    return next(err);
  }

  const todo = {
    id: randomUUID(),
    title,
    completed: false,
  };

  create(todo);
  then(() => res.status(201).json(todo), next);
});

const completedHandler = (completed) => {
  return (req, res, next) =>
    update(req.params.id, { completed }).then((todo) => {
      if (todo) {
        return res.json();
      }
      const err = new Error("Todo not found");
      err.statusCode = 404;
      next(err);
    }, next);
};

app
  .route(`${endpoint}/:id/completed`)
  .put(completedHandler(true))
  .delete(completedHandler(false));

app.delete(`${endpoint}/:id`, (req, res, next) => {
  remove(req.params.id).then((id) => {
    if (id !== null) {
      return res.status(204).end();
    }
    const err = new Error("Todo not found");
    err.statusCode = 404;
    next(err);
  }, next);
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.statusCode || 500).json({ error: err.message });
});

app.listen(PORT, () => {
  console.log(`🚀server is up and run at ${serverUrl}`);
});
