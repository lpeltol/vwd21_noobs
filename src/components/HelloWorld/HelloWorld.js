import React from "react";
import "./HelloWorld.css";

const onClickHandler = () => {
  console.log("Hello");
};

export const HelloWorld = () => {
  return (
    <div>
      <h1 className="Header">Hello world!</h1>
      <button onClick={onClickHandler} className="Button">
        Hello
      </button>
    </div>
  );
};
