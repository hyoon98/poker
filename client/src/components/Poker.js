import { io } from "socket.io-client";
import { useEffect, useState } from "react";

function Poker({ location }) {
  const socket = io("http://localhost:5000");
  useEffect(() => {
    socket.on("connect", () => {
      console.log(`connected with id ${socket.id}`);
    });
  }, []);
  return (
    <h1 class="text-white mb-5 pb-3">
      <div>Poker</div>
    </h1>
  );
}

export default Poker;
