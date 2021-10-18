import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import queryString from "query-string";
import { useHistory } from "react-router-dom";
function Poker({ location }) {
  const history = useHistory();
  const { name, room } = queryString.parse(location.search);
  useEffect(() => {
    const socket = io("localhost:5000");
    socket.emit("check-join", room, name, (res) => {
      console.log(res.success);
      if (!res.success) {
        alert(res.message);
        history.push("/");
      }
    });
    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <h1 class="text-white mb-5 pb-3">
      <div>Poker</div>
    </h1>
  );
}

export default Poker;
