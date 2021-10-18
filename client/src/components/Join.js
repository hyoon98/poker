import "./css/Join.css";
import { useState } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";

function Join() {
  const history = useHistory();
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  function createHandler(e) {
    e.preventDefault();
    if (!name) {
      alert("Please enter a name");
    } else {
      Axios.post(`http://localhost:5001/create`).then((res) => {
        history.push(`/room?name=${name}&room=${res.data}`);
      });
    }
  }

  function joinHandler(e) {
    e.preventDefault();
    if (!name) {
      alert("Please enter a name");
    } else if (!room) {
      alert("Please enter a room to join");
    } else {
      Axios.get(`http://localhost:5001/check/${room}/${name}`)
        .then(() => {
          history.push(`/room?name=${name}&room=${room}`);
        })
        .catch((e) => {
          alert(e.response.data.message);
        });
    }
  }

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
              <button onClick={createHandler} class="btn btn-primary btn-lg">
                Create Room
              </button>
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
              <button onClick={joinHandler} class="btn btn-primary btn-lg">
                Join Room
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Join;
