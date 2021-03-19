import React, { useState, useEffect } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import { draw } from "../../drawUtils/draw";
import { drawBackground } from "../../drawUtils/drawBackground";
import { GameMenu } from "../GameMenu/GameMenu";
import handOpen from "../../images/handClosed.png";
import handClosed from "../../images/handClosed.png";
import "./GameContainer.css";

const initBackground = () => {
  var gameCanvas = document.getElementById("gameCanvas");
  if (gameCanvas) {
    var gameCtx = gameCanvas.getContext("2d");
    drawBackground(gameCanvas.width, gameCanvas.height, gameCtx);
  }
};

export const GameContainer = ({ model }) => {
  const [difficulty, setDifficulty] = useState("easy");

  useEffect(() => {
    initBackground();
  }, [model]);

  return (
    <div id="container" className={"GameContainer"}>
      {model ? (
        <React.Fragment>
          <video autoPlay={true} id="video"></video>
          <div className="CanvasWrapper">
            <GameMenu
              id="StartGame"
              header="DUCK SHOOTER"
              score={false}
              body={
                <div>
                  <p>Aim with your hand</p>
                  <p>Shoot by spreading your fingers</p>
                  <img src={handOpen} alt="handOpen" className="HandOpen" />
                  <p>Reload by clenching fingers together</p>
                  <img
                    src={handClosed}
                    alt="handClosed"
                    className="HandClosed"
                  />

                  <div className="difficultSelect">
                    <label htmlFor="difficulty">Select difficulty:</label>
                    <select
                      id="difficulty"
                      onChange={(e) => setDifficulty(e.target.value)}
                      value={difficulty}
                    >
                      <option value="easy">Easy</option>
                      <option value="medium">Normal</option>
                      <option value="impossible">Impossible</option>
                    </select>
                  </div>
                </div>
              }
              onClick={() => draw(model, difficulty)}
              buttonTxt="Start game"
            />
            <GameMenu
              id="GameOver"
              header="Game over!"
              score={true}
              body={
                <div className="difficultSelect">
                  <label htmlFor="difficulty2">Select difficulty:</label>
                  <select
                    id="difficulty2"
                    onChange={(e) => setDifficulty(e.target.value)}
                    value={difficulty}
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Normal</option>
                    <option value="impossible">Impossible</option>
                  </select>
                </div>
              }
              onClick={() => draw(model, difficulty)}
              buttonTxt="Play again"
            />
            <canvas id="videoCanvas" />
            <canvas id="gameCanvas" />
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <span className={"LoadingSpan"}>Game is initializing</span>
          <PulseLoader size={20} margin={15} />
        </React.Fragment>
      )}
    </div>
  );
};
