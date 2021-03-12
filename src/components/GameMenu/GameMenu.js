import React from "react";
import "./GameMenu.css";

export const GameMenu = ({ id, header, score, body, onClick, buttonTxt }) => {
  return (
    <div className="Menu" id={id}>
      <span className="MenuHeader">{header}</span>
      {score && <p id="score"></p>}
      {body && body}
      <button onClick={onClick} className="PlayButton" id="PlayButton">
        {buttonTxt}
      </button>
    </div>
  );
};
