const express = require("express");
const router = express.Router();
const Rooms = require("../controller/rooms");

router.post("/create", (req, res) => {
  const room = Rooms.createRoom();
  return res.status(201).send(room);
});

router.get("/check/:room/:name", (req, res) => {
  const check = Rooms.checkJoin(req.params.room, req.params.name);
  if (check) {
    return res.status(401).json({ success: false, message: check });
  }
  return res.status(200).json({ success: true });
});

module.exports = router;
