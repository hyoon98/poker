const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: { origin: "http://localhost:3000" },
});

app.get("/", (req, res) => {
  res.render("home");
});
server.listen(5000, () => {
  console.log("Listening on 5000");
});

io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("connect", (socket) => {
    console.log(socket.id);
  });
});
