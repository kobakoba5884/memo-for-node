import express from "express";
import { endpoint, PORT, serverUrl } from "./constants.js";

let todos = [
  { id: 1, title: "Name", completed: false },
  { id: 2, title: "subject", completed: true },
];

const app = express();

app.use(express.json())

app.get(endpoint, (req, res) => {
  console.log("req.query", req.query);
  const completed = req.query.completed;
  console.log("completed", completed);

  if (!completed) {
    return res.json(todos);
  }

  res.json(todos.filter((todo) => todo.completed === Boolean(completed)));
});

app.post(endpoint, (req, res, next) => {
    
})

app.listen(PORT, () => {
  console.log(`🚀server is up and run at ${serverUrl}`);
});
