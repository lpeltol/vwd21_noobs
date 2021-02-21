import React, { useState, useEffect } from "react";
import "./WebCam.css";
//import * as handTrack from "handtrackjs";
import { Canvas } from "../Canvas/Canvas";
import { draw } from "../../drawUtils/draw";
import * as handpose from '@tensorflow-models/handpose';


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

    handpose.load().then((model) => {
      setModel(model);
      setVideo(StreamVideo());
    });

  }, []);

  /*
  const detect = () => {
    model.estimateHands(video).then((hands) => {
      if (hands != []) {
        //draw(predictions[0]?.bbox, video);
        hands.forEach(hand => console.log(hand.landmarks));
      }
      detect();
    });
  };
  */

  return (
    <div id="container" className={"GameContainer"}>
      {model ? (
        <React.Fragment>
          <video autoPlay={true} id="video"></video>
          <button onClick={() => draw(model)} className="startButton">Predict Pose</button>
          <div className="canvasWrapper">
            <canvas id="videoCanvas" />
            <canvas id="gameCanvas" />
          </div>
        </React.Fragment>
      ) : (
          <span className={"LoadingSpan"}>Loading model</span>
        )}
    </div>
  );
};
