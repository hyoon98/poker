import React from "react";

function Waiting({ rid }) {
  return (
    <div>
      <h1 class="text-white mb-5 pb-3">Waiting for Another Player...</h1>
      <button
        class="btn btn-light"
        onClick={(e) => {
          e.preventDefault();
          navigator.clipboard.writeText(rid);
        }}
      >
        Copy Room ID
      </button>
    </div>
  );
}

export default Waiting;
