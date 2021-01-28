import React, { useState, useEffect } from "react";
import "./WebCam.css";
import * as handTrack from "handtrackjs";

<<<<<<< HEAD
const SIZE = 500;

const StreamVideo = () => {
  var video = document.querySelector("#video");
  video.width = SIZE;
  video.height = SIZE;
=======
const StreamVideo = () => {
  var video = document.querySelector("#video");
  video.width = 500;
  video.height = 500;
>>>>>>> fa080c75ac9a529a97bc82009ba9749ed3e4f81e
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
<<<<<<< HEAD
  
=======
>>>>>>> fa080c75ac9a529a97bc82009ba9749ed3e4f81e
  const [predictions, setPredictions] = useState([]);
  const [video, setVideo] = useState({});
  const [model, setModel] = useState(undefined);

<<<<<<< HEAD
  console.log("Predictions:", predictions?.[0]);
  useEffect(() => {
    const modelParams = {
      flipHorizontal: false,   // flip e.g for video 
      imageScaleFactor: 1,  // reduce input image size .
      maxNumBoxes: 20,        // maximum number of boxes to detect
      iouThreshold: 0.5,      // ioU threshold for non-max suppression
      scoreThreshold: 0.85,    // confidence threshold for predictions.
    }
    handTrack.load(modelParams).then((model) => {
=======
  console.log("Predictions:", predictions);

  useEffect(() => {
    handTrack.load().then((model) => {
>>>>>>> fa080c75ac9a529a97bc82009ba9749ed3e4f81e
      setModel(model);
      setVideo(StreamVideo());
    });
  }, []);

  const detect = () => {
<<<<<<< HEAD

      model.detect(video).then((predictions) => {
        //setPredictions((oldPredictions) => [...oldPredictions, predictions]);
        setPredictions(predictions);

        if (predictions !== undefined) {
          draw(predictions[0]?.bbox)
        }

      });

=======
    model.detect(video).then((predictions) => {
      //setPredictions((oldPredictions) => [...oldPredictions, predictions]);
      setPredictions(predictions);
      detect();
    });
>>>>>>> fa080c75ac9a529a97bc82009ba9749ed3e4f81e
  };

  return (
    <div id="container">
      {model ? (
        <React.Fragment>
          <video autoPlay={true} id="video"></video>
          <button onClick={detect}>Predict Pose</button>
<<<<<<< HEAD
          <canvas id="myCanvas"></canvas>
        </React.Fragment>
      ) : (
          <span>Loading model</span>
        )}
    </div>
  );
};

const draw = (r) => {

  if (r !== undefined) {
    var canvas = document.querySelector("canvas");
    var ctx = canvas.getContext("2d")
    var video = StreamVideo()
    canvas.height = video.videoHeight
    canvas.width = video.videoWidth
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(video, 0, 0)
    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.strokeStyle = "red";
    ctx.rect(r[0], r[1], r[2], r[3]);
    ctx.stroke();
  }
}
=======
        </React.Fragment>
      ) : (
        <span>Loading model</span>
      )}
    </div>
  );
};
>>>>>>> fa080c75ac9a529a97bc82009ba9749ed3e4f81e
