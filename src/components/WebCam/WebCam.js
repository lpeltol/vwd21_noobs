import React, { useState, useEffect } from "react";
import * as handpose from "handtrackjs";
import PulseLoader from "react-spinners/PulseLoader";
import { draw } from "../../drawUtils/draw";
import "./WebCam.css";
import { GameMenu } from "../GameMenu/GameMenu";
import { drawBackground } from "../../drawUtils/drawBackground";

const SIZE = 500;

const StreamVideo = () => {
  var video = document.querySelector("#video");
  video.width = SIZE;
  video.height = SIZE;

  if (navigator.mediaDevices.getUserMedia) {
    //console.log(navigator.mediaDevices.getUserMedia);
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(function (stream) {
        video.srcObject = stream;
      })
      .catch(function (error) {
        console.log("Something went wrong!");
      });
  }

  return video;
};

const initBackground = () => {
  var gameCanvas = document.getElementById("gameCanvas");
  if (gameCanvas) {
    var gameCtx = gameCanvas.getContext("2d");
    drawBackground(gameCanvas.width, gameCanvas.height, gameCtx);
  }
};

export const WebCam = () => {
  const [video, setVideo] = useState({});
  const [model, setModel] = useState(undefined);

  useEffect(() => {
    const modelParams = {
      flipHorizontal: true, // flip e.g for video
      imageScaleFactor: 1, // reduce input image size .
      maxNumBoxes: 1, // maximum number of boxes to detect
      iouThreshold: 0.5, // ioU threshold for non-max suppression
      scoreThreshold: 0.85, // confidence threshold for predictions.
    };

    handpose.load(modelParams).then((model) => {
      setModel(model);
      setVideo(StreamVideo());
    });
  }, []);

  return (
    <div id="container" className={"GameContainer"}>
      {model ? (
        <React.Fragment>
          <video autoPlay={true} id="video"></video>
          <div className="canvasWrapper">
            <GameMenu
              id="StartGame"
              header="DUCK SHOOTER"
              score={false}
              body={
                <div>
                  <i>How to play</i>
                  <p>Aim with your hand</p>
                  <p>Shoot by spreading your fingers</p>
                  <p>Reload by clenching fingers together</p>
                </div>
              }
              onClick={() => draw(model)}
              buttonTxt="Start game"
            />
            <GameMenu
              id="GameOver"
              header="Game over!"
              score={true}
              onClick={() => draw(model)}
              buttonTxt="Play again"
            />
            <canvas id="videoCanvas" />
            <canvas id="gameCanvas" onLoad={initBackground()} />
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
