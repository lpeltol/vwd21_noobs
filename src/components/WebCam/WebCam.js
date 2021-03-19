import React, { useState, useEffect } from "react";
import * as handpose from "handtrackjs"; // https://blog.tensorflow.org/2019/11/handtrackjs-tracking-hand-interactions.html
import { GameContainer } from "../GameContainer/GameContainer";
import "./WebCam.css";

const SIZE = 500;

const StreamVideo = () => {
  var video = document.querySelector("#video");
  video.width = SIZE;
  video.height = SIZE;

  if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(function (stream) {
        video.srcObject = stream;
      })
      .catch(function (error) {
        console.log("Something went wrong! Make sure you have webcam enabled");
      });
  }

  return video;
};

export const WebCam = () => {
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
      StreamVideo();
    });
  }, []);

  return <GameContainer model={model} />;
};
