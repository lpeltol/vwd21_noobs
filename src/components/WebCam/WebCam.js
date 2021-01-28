import React, { useState, useEffect } from "react";
import "./WebCam.css";
import * as handTrack from "handtrackjs";

const StreamVideo = () => {
  var video = document.querySelector("#video");
  video.width = 500;
  video.height = 500;
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

  console.log("Predictions:", predictions);

  useEffect(() => {
    handTrack.load().then((model) => {
      setModel(model);
      setVideo(StreamVideo());
    });
  }, []);

  const detect = () => {
    model.detect(video).then((predictions) => {
      //setPredictions((oldPredictions) => [...oldPredictions, predictions]);
      setPredictions(predictions);
      detect();
    });
  };

  return (
    <div id="container">
      {model ? (
        <React.Fragment>
          <video autoPlay={true} id="video"></video>
          <button onClick={detect}>Predict Pose</button>
        </React.Fragment>
      ) : (
        <span>Loading model</span>
      )}
    </div>
  );
};
