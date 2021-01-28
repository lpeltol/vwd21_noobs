import React from "react";
import "./WebCam.css";
const handpose = require('@tensorflow-models/handpose');
// require('@tensorflow/tfjs-backend-webgl');
require('@tensorflow/tfjs-backend-wasm');
const StreamVideo = () => {
  var video = document.querySelector("#video");
  if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(function (stream) {
        video.srcObject = stream;
      })
      .catch(function (error) {
        console.log("Something went wrong!");
      });
  }
};

export const WebCam = () => {
  return (
    <div id="container">
      <button onClick={StreamVideo}>Stream Video</button>
      <button onClick={PredictPose}>Predict Pose</button>
      <video autoPlay={true} id="video">

      </video>
    </div>
  );
};

async function PredictPose(){
  const model = await handpose.load();
  const predictions = await model.estimateHands(document.querySelector("#video"));
  if (predictions.length > 0) {

    for (let i = 0; i < predictions.length; i++) {
      const keypoints = predictions[i].landmarks;

      // Log hand keypoints.
      for (let i = 0; i < keypoints.length; i++) {
        const [x, y, z] = keypoints[i];
        console.log(`Keypoint ${i}: [${x}, ${y}, ${z}]`);
      }
    }
  }
};