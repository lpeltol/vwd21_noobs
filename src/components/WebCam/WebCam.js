import React, { useState, useEffect } from "react";
import * as handpose from "handtrackjs";
import PulseLoader from "react-spinners/PulseLoader";
import { draw } from "../../drawUtils/draw";
import "./WebCam.css";

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
          <button
            onClick={() => draw(model)}
            className="startButton"
            id="startButton"
          >
            Start game
          </button>
          <div className="canvasWrapper">
            <div className="scoreboard" id="scoreboard">
              <span className="gameOverText">GAME OVER!</span>
              <p id="score"></p>
              <button
                onClick={() => draw(model)}
                className="playAgainButton"
                id="playAgainButton"
              >
                Play again!
              </button>
            </div>
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
