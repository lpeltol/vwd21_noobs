import React, { useState, useEffect } from "react";
import "./WebCam.css";
import * as handTrack from "handtrackjs";

const SIZE = 500;
var bullet = true;
var shots = []

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

  //console.log("Predictions:", predictions?.[0]);
  useEffect(() => {
    const modelParams = {
      flipHorizontal: true, // flip e.g for video
      imageScaleFactor: 1, // reduce input image size .
      maxNumBoxes: 1, // maximum number of boxes to detect
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

    var boxX = r[0];
    var boxY = r[1];
    var boxWidth = r[2];
    var boxHeight = r[3];
    var ratio = boxWidth / boxHeight
  

    canvas.height = video.height;
    canvas.width = video.width;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //ctx.drawImage(video, 0, 0);

    var r = canvas.width * 0.05;
    ctx.save();
    ctx.beginPath();
    ctx.translate(boxX + boxWidth / 2, boxY + boxHeight / 2);

    // Circle
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, r, 0, Math.PI * 2)

    // Vertical line
    ctx.moveTo(0, 0 - r);
    ctx.lineTo(0, 0 + r);

    // Horizontal line
    ctx.moveTo(0 - r, 0);
    ctx.lineTo(0 + r, 0);
    
    ctx.lineWidth = 4;
    ctx.strokeStyle = "red";
    ctx.stroke();
    ctx.restore();

    if (ratio) {
      var fontSize = Math.floor(canvas.width * 0.1);
      ctx.font = fontSize + 'px serif';
      ctx.fillStyle = 'black';
      console.log(ratio)
      if (ratio < 0.8) {
        ctx.fillText("Loaded", 100, 100)
        bullet = true
      }
      else {
        ctx.fillText("Reload", 100, 100)
        if (bullet) {
          shots = [...shots, [boxX + boxWidth / 2, boxY + r[3] / 2]];
          bullet = false;
        }
      }
    }

    console.log(shots);
  }
};


