const Rooms = require("./controller/rooms");
const express = require("express");
const check = require("./routes/check");
const cors = require("cors");
const { emit } = require("process");
const app = express();
const server = require("http").createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});
app.use(cors());
app.use(check);

io.on("connection", (socket) => {
  console.log("Someone has connected with socket:" + socket.id);
  let currentRoom = "";
  socket.on("check-join", (room, name, callback) => {
    const check = Rooms.checkJoin(room, name);
    if (check) {
      callback({ success: false, message: check });
    } else {
      Rooms.addUser(room, name, socket.id);
      socket.join(room);
      currentRoom = room;
      if (Rooms.getRoomLength(room) == 2) {
        io.to(room).emit("start", name, true);
      } else {
        io.to(room).emit("start", name, false);
      }
      callback({ success: true });
    }
  });
  socket.on("disconnecting", () => {
    socket.to(currentRoom).emit("start", "", false);
  });

  socket.on("disconnect", () => {
    console.log("Someone has disconneced with socket:" + socket.id);
    Rooms.removeUser(socket.id);
  });

  socket.on("move", (board, room) => {
    socket.to(room).emit("move", board);
  });
});

app.listen(5001, () => {
  console.log("Listening on 5001");
});

server.listen(5000, () => {
  console.log("Listening on 5000");
});
