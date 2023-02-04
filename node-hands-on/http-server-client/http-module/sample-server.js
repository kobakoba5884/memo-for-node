import http from "http";

const PORT = 2222;
const endpoint = "/api/todos";
export const serverUrl = `http://localhost:${PORT}${endpoint}`;

const todos = [
  { id: 1, title: "Name", completed: false },
  { id: 2, title: "substring", completed: true },
];

const server = http
  .createServer((req, res) => {
    if (req.url === endpoint) {
      if (req.method === "GET") {
        res.setHeader("Content-Type", "application/json");
        return res.end(JSON.stringify(todos));
      }

      res.statusCode = 405;
    } else {
      res.statusCode = 404;
    }

    res.end();
  })
  .listen(PORT, () => {
    console.log(url);
  });

http
  .request(url, (res) => {
    let responseData = "";

    console.log("statusCode", res.statusCode);
    res.on("data", (chunk) => (responseData += chunk));
    res.on("end", () => console.log("responseData", JSON.parse(responseData)));
  })
  .end();

http
  .request(url, { method: "POST" }, (res) => {
    console.log("statusCode", res.statusCode);
  })
  .end();

process.on("SIGINT", () => {
  server.close(() => {
    console.log("Server closed");
    process.exit(0);
  });
});
