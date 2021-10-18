const Users = require("./controller/users");
const express = require("express");
const check = require("./routes/check");
const cors = require("cors");
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

  socket.on("check-join", (room, name, callback) => {
    const check = Users.checkJoin(room, name);
    if (check) {
      callback({ success: false, message: check });
    } else {
      Users.addUser(room, name);
      callback({ success: true });
    }
  });

  socket.on("disconnect", () => {
    console.log("Someone has disconneced with socket:" + socket.id);
  });
});

app.listen(5001, () => {
  console.log("Listening on 5001");
});

server.listen(5000, () => {
  console.log("Listening on 5000");
});
