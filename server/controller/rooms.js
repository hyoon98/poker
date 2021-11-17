const rooms = [];
const shortid = require("shortid");

function addUser(id, user, uid) {
  const index = rooms.findIndex((room) => room.id === id);
  rooms[index].users.push({ name: user, uid: uid });
}

function removeUser(uid) {
  for (let k = 0; k < rooms.length; k++) {
    const users = rooms[k].users;
    for (let i = 0; i < users.length; i++) {
      if (users[i].uid === uid) {
        users.splice(i, 1);
      }
    }
  }
}

function createRoom() {
  const room = shortid.generate();
  rooms.push({ id: room, users: [] });
  return room;
}

function getRoomLength(roomid) {
  const currentRoom = rooms.find((room) => room.id === roomid);
  if (currentRoom) return currentRoom.users.length;
}

function checkJoin(id, name) {
  const currentRoom = rooms.find((room) => room.id === id);
  if (!currentRoom) {
    return "Room doesn't exist";
  }
  if (currentRoom.users.length > 1) {
    return "Room is full";
  }
  if (currentRoom.users.find((user) => user.name === name)) {
    return "Name already exists in this room";
  }
}

module.exports = { addUser, checkJoin, createRoom, removeUser, getRoomLength };
