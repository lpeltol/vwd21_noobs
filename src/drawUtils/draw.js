import * as fp from "fingerpose";
import DuckHandler from '../components/duckHandler/DuckHandler';

let bullet = true;
let shots = [];
const VIDEOSIZE = 100;
const GAMESIZE = 400;
let counter = 0;
let x = 0.5;
let y = 0.5;


export const draw = (model) => {

  DuckHandler.InitializeDucks(GAMESIZE);

  var video = document.getElementById("video");

  var videoCanvas = document.getElementById("videoCanvas");
  videoCanvas.height = VIDEOSIZE;
  videoCanvas.width = VIDEOSIZE;
  var videoCtx = videoCanvas.getContext("2d");

  var gameCanvas = document.getElementById("gameCanvas");
  gameCanvas.height = GAMESIZE;
  gameCanvas.width = GAMESIZE;
  var gameCtx = gameCanvas.getContext("2d");

  setInterval(function () {
    drawScene(videoCtx, gameCtx, video, model);
  }, 10);
};

const drawScene = (videoCtx, gameCtx, video, model) => {

  counter += 1;
  var min = Math.min(video.videoWidth, video.videoHeight);
  var sx = (video.videoWidth - min) / 2;
  var sy = (video.videoHeight - min) / 2;

  videoCtx.save();
  videoCtx.beginPath();
  videoCtx.clearRect(0, 0, VIDEOSIZE, VIDEOSIZE);
  videoCtx.drawImage(video, sx, sy, min, min, 0, 0, VIDEOSIZE, VIDEOSIZE);
  videoCtx.restore();

  var imgData = videoCtx.getImageData(0, 0, VIDEOSIZE, VIDEOSIZE);

  drawBackground(GAMESIZE, GAMESIZE, gameCtx);

  // HANDTRACK
  if (counter == 5) {
    model.detect(imgData).then((predictions) => {
      if (predictions?.[0]?.bbox != undefined) {

        x = (predictions[0].bbox[0] + (predictions[0].bbox[2] / 2)) / VIDEOSIZE;
        y = (predictions[0].bbox[1] + (predictions[0].bbox[3] / 2)) / VIDEOSIZE;

        //drawBoundingBox(videoCtx, predictions[0].bbox[0], predictions[0].bbox[1] + predictions[0].bbox[3], predictions[0].bbox[2], predictions[0].bbox[3]);
        var ratio = predictions[0].bbox[2] / predictions[0].bbox[3];

        if(ratio >= 0.85 && bullet === true){
          DuckHandler.CreateShootingSound();
          DuckHandler.KillDuck(x * GAMESIZE, y * GAMESIZE);
          bullet = false;
        }

        if(ratio <= 0.6){
          bullet = true;
        }
        

        console.log(ratio, bullet);
      }
    });

    counter = 0;
  }
  drawCrosshair(gameCtx, x, y, GAMESIZE);

  DuckHandler.CreateNewDuck(0.01);
  DuckHandler.DrawDucksAndUpdate(gameCtx);
  DuckHandler.DeleteDucks();

}

const drawCrosshair = (ctx, x, y, SIZE) => {

  var r = SIZE * 0.05;
  ctx.save();
  ctx.beginPath();
  ctx.translate(Math.floor(x * GAMESIZE), Math.floor(y * GAMESIZE));

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

const drawBoundingBox = (ctx, x, y, w, h) => {

  ctx.save();
  ctx.beginPath();
  ctx.rect(x, y, w, -h);
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
