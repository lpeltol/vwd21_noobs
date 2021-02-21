import * as fp from "fingerpose";
import DuckHandler from '../components/duckHandler/DuckHandler';

let bullet = true;
let shots = [];
const VIDEOSIZE = 100;
const GAMESIZE = 600;
let counter = 0;
let x_ch = GAMESIZE / 2;
let y_ch = x_ch;

DuckHandler.InitializeDucks();

export const draw = (model) => {

  var video = document.getElementById("video");

  var videoCanvas = document.getElementById("videoCanvas");
  videoCanvas.height = VIDEOSIZE;
  videoCanvas.width = VIDEOSIZE;
  var videoCtx = videoCanvas.getContext("2d");

  var gameCanvas = document.getElementById("gameCanvas");
  gameCanvas.height = GAMESIZE;
  gameCanvas.width = GAMESIZE;
  var gameCtx = gameCanvas.getContext("2d");

  const GE = new fp.GestureEstimator([
    fp.Gestures.VictoryGesture,
    fp.Gestures.ThumbsUpGesture
  ]);

  setInterval(function () {
    drawScene(videoCtx, gameCtx, video, model, GE);
  }, 1);

};

const drawScene = (videoCtx, gameCtx, video, model, GE) => {

  counter += 1;
  // var min = Math.min(video.videoWidth, video.videoHeight);
  // var sx = (video.videoWidth - min) / 2;
  // var sy = (video.videoHeight - min) / 2;

  // videoCtx.save();
  // videoCtx.beginPath();
  // videoCtx.clearRect(0, 0, VIDEOSIZE, VIDEOSIZE);
  // videoCtx.drawImage(video, sx, sy, min, min, 0, 0, VIDEOSIZE, VIDEOSIZE);
  // videoCtx.restore();

  // var imgData = videoCtx.getImageData(0, 0, VIDEOSIZE, VIDEOSIZE);

  if (counter == 10) {
    model.estimateHands(video).then((hands) => {
      if (hands?.[0]?.boundingBox != undefined) {

        //const estimatedGestures = GE.estimate(hands[0].landmarks, 7.5);

        var x = hands[0].annotations.indexFinger[3][0];
        var y = hands[0].annotations.indexFinger[3][1];
        x_ch = Math.floor(x / video.width * GAMESIZE);
        y_ch = Math.floor(y / video.height * GAMESIZE);

        console.log(x_ch);
        console.log(y_ch);

        // console.log(x, y);
        // console.log(x_ch, y_ch);
        // drawCrosshair(videoCtx, x, y, VIDEOSIZE);
      }
    });

    counter = 0;
  }

  drawBackground(GAMESIZE, GAMESIZE, gameCtx);
  drawCrosshair(gameCtx, x_ch, y_ch, GAMESIZE);
  DuckHandler.CreateNewDuck(0.01);
  DuckHandler.DrawDucksAndUpdate(gameCtx);
  DuckHandler.DeleteDucks();

}

const drawCrosshair = (ctx, x, y, SIZE) => {

  var r = SIZE * 0.05;
  ctx.save();
  ctx.beginPath();
  ctx.translate(x, y);

  // Circle
  ctx.moveTo(0, 0);
  ctx.arc(0, 0, r, 0, Math.PI * 2);

  // Vertical line
  ctx.moveTo(0, 0 - r);
  ctx.lineTo(0, 0 + r);

  // Horizontal line
  ctx.moveTo(0 - r, 0);
  ctx.lineTo(0 + r, 0);

  ctx.lineWidth = 1;
  ctx.strokeStyle = "red";
  ctx.stroke();
  ctx.restore();
}

const drawBackground = (width, height, ctx) => {

  ctx.save();
  ctx.beginPath();
  ctx.fillStyle = "skyblue";
  ctx.rect(0, 0, width, height * 0.75);
  ctx.fill();
  ctx.restore();

  ctx.save();
  ctx.beginPath();
  ctx.fillStyle = "green";
  ctx.rect(0, height * 0.75, width, height * 0.25);
  ctx.fill();
  ctx.restore();
};
