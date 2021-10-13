import "./css/Join.css";
import { Link } from "react-router-dom";
import { useState } from "react";

function Join() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  return (
    <div class="d-flex flex-column min-vh-100 justify-content-center align-items-center">
      <h1 class="text-white mb-5 pb-3">Poker</h1>
      <form>
        <div class="form-group m-2">
          <div class="row my-2">
            <div class="col">
              <input
                type="text"
                class="form-control-lg"
                placeholder="Username"
                onChange={(event) => {
                  setName(event.target.value);
                }}
              ></input>
            </div>
            <div class="col text-center">
              <Link
                onClick={(e) =>
                  !name ? e.preventDefault() : setRoom(Date.now())
                }
                to={`/room?name=${name}&room=${room}`}
              >
                <button type="submit" class="btn btn-primary btn-lg">
                  Create Room
                </button>
              </Link>
            </div>
          </div>
          <div class="row my-2">
            <div class="col">
              <input
                type="text"
                class="form-control-lg"
                placeholder="Room ID"
                onChange={(event) => {
                  setRoom(event.target.value);
                }}
              ></input>
            </div>
            <div class="col text-center">
              <Link
                onClick={(e) => (!name || room ? e.preventDefault() : null)}
                to={`/room?name=${name}&room=${room}`}
              >
                <button type="submit" class="btn btn-primary btn-lg">
                  Join Room
                </button>
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Join;
