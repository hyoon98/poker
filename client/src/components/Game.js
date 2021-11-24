import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import queryString from "query-string";
import { useHistory } from "react-router-dom";
import Square from "./Square";
import Waiting from "./Waiting";
import "./css/Game.css";
function Game({ location }) {
  const history = useHistory();
  const EMPTY = ["", "", "", "", "", "", "", "", ""];
  const { name, room } = queryString.parse(location.search);
  const [board, setBoard] = useState(EMPTY);
  const [currentSocket, setCurrentSocket] = useState(null);
  const [won, setWon] = useState(false);
  const [player, setPlayer] = useState("");
  const [turn, setTurn] = useState("");
  const [waiting, setWaitng] = useState(true);
  const wins = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [2, 4, 6],
    [6, 7, 8],
    [3, 4, 5],
    [2, 5, 8],
    [1, 4, 7],
  ];

  useEffect(() => {
    const socket = io("localhost:5000");
    setCurrentSocket(socket);
    socket.emit("check-join", room, name, (res) => {
      console.log(res.success);
      if (!res.success) {
        alert(res.message);
        history.push("/");
      }
    });
    socket.on("start", (first, status) => {
      if (status) {
        setWon(false);
        setWaitng(false);
        setBoard(EMPTY);
        setTurn("X");
        if (first === name) setPlayer("X");
        else setPlayer("O");
      } else {
        setWaitng(true);
        setBoard(EMPTY);
        setTurn("");
        setPlayer("");
      }
    });

    socket.on("move", (board) => {
      setBoard(board);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (turn === "X") setTurn("O");
    else setTurn("X");
    for (let i = 0; i < 8; i++) {
      let count = 0;
      for (let k = 0; k < 3; k++) {
        if (board[wins[i][k]] === turn && turn !== "") count++;
      }
      if (count === 3) {
        setWon(true);
      }
    }
  }, [board]);

  return (
    <div class="d-flex flex-column min-vh-100 justify-content-center align-items-center">
      <h1 className="text-white mb-5 pb-3">
        <div>Tic-Tac-Toe</div>
      </h1>
      {!won ? (
        <>
          <h1 className="text-white mb-5 pb-3">{"You are: " + player}</h1>
          <h1
            className={
              turn === player
                ? "text-success mb-5 pb-3"
                : "text-danger mb-5 pb-3"
            }
          >
            {turn === player ? "Your Turn" : "Opponent Turn"}
          </h1>
        </>
      ) : null}
      {!waiting ? (
        !won ? (
          <div className="board">
            {board.map((square, index) => {
              return (
                <Square
                  handler={() => {
                    if (square || player !== turn || won === true);
                    else {
                      setBoard([
                        ...board.slice(0, index),
                        turn,
                        ...board.slice(index + 1),
                      ]);
                      console.log(currentSocket);
                      currentSocket.emit(
                        "move",
                        [
                          ...board.slice(0, index),
                          turn,
                          ...board.slice(index + 1),
                        ],
                        room
                      );
                    }
                  }}
                  value={square}
                />
              );
            })}
          </div>
        ) : (
          <div class="d-flex flex-column justify-content-center align-items-center">
            <h1 className="text-white mb-5 pb-3">
              {turn !== player ? "You won!" : "You lost!"}
            </h1>
            <button
              class="btn btn-primary btn-m"
              style={{ margin: "10px" }}
              onClick={() => {
                window.location.reload();
              }}
            >
              Play Again
            </button>
            <button
              style={{ margin: "10px" }}
              onClick={() => {
                window.open("/");
              }}
            >
              Back to Lobby
            </button>
          </div>
        )
      ) : (
        <Waiting rid={room} />
      )}
    </div>
  );
}

export default Game;
