import http from "http";
import next from "next";
import {Server} from "socket.io";
import { PORT, serverUrl } from "./constants.js";

let todos = [
  { id: 1, title: "Name", completed: false },
  { id: 2, title: "subject", completed: true },
];

let id = 2;

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });

nextApp.prepare().then(
  () => {
    const server = http.createServer(nextApp.getRequestHandler()).listen(PORT, () => {
      console.log(`🚀server is up and running at ${serverUrl}`);
    });

    const io = new Server(server);

    const ioTodos = io.of("/todos");
    ioTodos.on("connection", (socket) => {
      console.log("connected");
      socket.emit("todos", todos);

      socket.on("createTodo", (title) => {
        if (typeof title !== "string" || !title) {
          return;
        }

        const todo = {
          id: id++,
          title,
          completed: false,
        };
        todos.push(todo);
        ioTodos.emit("todos", todos);
      }).on('updateCompleted', (id, completed) => {
        todos = todos.map(todo => todo.id === id ? { ...todo, completed }: todo)
        ioTodos.emit('todos', todos)
      }).on('deleteTodo', id => {
        todos = todos.filter(todo => todo.id !== id)
        ioTodos.emit('todos', todos)
      })
    });
  },
  (err) => {
    console.log(err);
    process.exit(1);
  }
);
