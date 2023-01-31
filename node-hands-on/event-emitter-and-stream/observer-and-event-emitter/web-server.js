import http from "http";

const server = http.createServer();
const PORT = 3333;

server.on("request", (_, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.write("Hello World!");
  res.end();
});

server.on("listening", () => {
  console.log("🚀server is up !!");
});

server.on("error", (err) => {
    console.log(err.message)
});

server.on("close", () => {
    console.log('server is end')
});

server.listen(PORT);
