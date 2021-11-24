import React from "react";
import "./css/Game.css";

export default function Square({ value, handler }) {
  return (
    <div className="square" onClick={handler}>
      <h1 class="d-flex justify-content-center align-items-center align-content-center h-100">
        {value}
      </h1>
    </div>
  );
}
