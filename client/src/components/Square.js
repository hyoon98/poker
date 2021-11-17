import React from "react";
import "./css/Game.css";

export default function Square({ value, handler }) {
  return (
    <div className="square" onClick={handler}>
      <h1>{value}</h1>
    </div>
  );
}
