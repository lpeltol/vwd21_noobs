import React, { useState, useEffect } from "react";
import "./WebCam.css";
import * as handTrack from "handtrackjs";

const SIZE = 500;

const StreamVideo = () => {
  var video = document.querySelector("#video");
  video.width = SIZE;
  video.height = SIZE;
  if (navigator.mediaDevices.getUserMedia) {
    console.log(navigator.mediaDevices.getUserMedia);
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
  const [predictions, setPredictions] = useState([]);
  const [video, setVideo] = useState({});
  const [model, setModel] = useState(undefined);

  console.log("Predictions:", predictions?.[0]);
  useEffect(() => {
    const modelParams = {
      flipHorizontal: false, // flip e.g for video
      imageScaleFactor: 1, // reduce input image size .
      maxNumBoxes: 20, // maximum number of boxes to detect
      iouThreshold: 0.5, // ioU threshold for non-max suppression
      scoreThreshold: 0.85, // confidence threshold for predictions.
    };
    handTrack.load(modelParams).then((model) => {
      setModel(model);
      setVideo(StreamVideo());
    });
  }, []);

  const detect = () => {
    model.detect(video).then((predictions) => {
      //setPredictions((oldPredictions) => [...oldPredictions, predictions]);
      setPredictions(predictions);

      if (predictions !== undefined) {
        draw(predictions[0]?.bbox, video);
      }
      detect();
    });
  };

  return (
    <div id="container">
      {model ? (
        <React.Fragment>
          <video autoPlay={true} id="video"></video>
          <button onClick={detect}>Predict Pose</button>
          <canvas id="myCanvas"></canvas>
        </React.Fragment>
      ) : (
        <span>Loading model</span>
      )}
    </div>
  );
};

const draw = (r, video) => {
  if (r !== undefined) {
    var canvas = document.querySelector("canvas");
    var ctx = canvas.getContext("2d");
    canvas.height = video.videoHeight;
    canvas.width = video.videoWidth;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(video, 0, 0);
    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.strokeStyle = "red";
    ctx.rect(r[0], r[1], r[2], r[3]);
    ctx.stroke();
  }
};
