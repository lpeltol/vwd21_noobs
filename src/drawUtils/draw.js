
import * as fp from "fingerpose";
import DuckHandler from '../components/duckHandler/DuckHandler';

let bullet = true;
let shots = [];
const VIDEOSIZE = 200;
const GAMESIZE = 200;

DuckHandler.InitializeDucks();

export const draw = (model) => {

  var video = document.getElementById("video");

  var videoCanvas = document.getElementById("videoCanvas");
  videoCanvas.heigth = VIDEOSIZE;
  videoCanvas.width = VIDEOSIZE;
  var videoCtx = videoCanvas.getContext("2d");

  var gameCanvas = document.getElementById("gameCanvas");
  gameCanvas.heigth = GAMESIZE;
  gameCanvas.width = GAMESIZE;
  var gameCtx = gameCanvas.getContext("2d");

  const GE = new fp.GestureEstimator([
    fp.Gestures.VictoryGesture,
    fp.Gestures.ThumbsUpGesture
  ]);

  setInterval(function () {
    drawScene(videoCtx, gameCtx, video, model, GE);
  }, 10);




  /*
  var boxX = bbox[0];
  var boxY = bbox[1];
  var boxWidth = bbox[2];
  var boxHeight = bbox[3];
  var ratio = boxWidth / boxHeight;

  canvas.height = video?.height;
  canvas.width = video?.width;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  //ctx.drawImage(video, 0, 0);

  var r = canvas.width * 0.05;
  ctx.save();
  ctx.beginPath();
  ctx.translate(boxX + boxWidth / 2, boxY + boxHeight / 2);

  // Circle
  ctx.moveTo(0, 0);
  ctx.arc(0, 0, r, 0, Math.PI * 2);

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
    ctx.font = fontSize + "px serif";
    ctx.fillStyle = "black";
    if (ratio < 0.8) {
      ctx.fillText("Loaded", 100, 100);
      bullet = true;
    } else {
      ctx.fillText("Reload", 100, 100);
      if (bullet) {
        shots = [...shots, [boxX + boxWidth / 2, boxY + r[3] / 2]];
        bullet = false;
      }
    }
  }
  */
};

const drawScene = (videoCtx, gameCtx, video, model, GE) => {

  var min = Math.min(video.videoWidth, video.videoHeight);
  var sx = (video.videoWidth - min) / 2;
  var sy = (video.videoHeight - min) / 2;
  var bbox;
  var bboxWidth;
  var bboxHeight;

  videoCtx.save();
  videoCtx.beginPath();
  videoCtx.clearRect(0, 0, VIDEOSIZE, VIDEOSIZE);
  videoCtx.drawImage(video, sx, sy, min, min, 0, 0, VIDEOSIZE, VIDEOSIZE);
  videoCtx.restore();

  var imgData = videoCtx.getImageData(0, 0, VIDEOSIZE, VIDEOSIZE);

  model.estimateHands(imgData).then((hands) => {
    //console.log(hands);
    if (hands?.[0]?.boundingBox != undefined) {

      const estimatedGestures = GE.estimate(hands[0].landmarks, 7.5);
      //console.log(estimatedGestures.gestures?.[0]?.name);
      //console.log(estimatedGestures.poseData[1]);

      bbox = hands[0].boundingBox;
      bboxWidth = bbox.bottomRight[0] - bbox.topLeft[0];
      bboxHeight = bbox.bottomRight[1] - bbox.topLeft[1];

      drawCrosshair(videoCtx, hands, VIDEOSIZE);
      drawCrosshair(gameCtx, hands, GAMESIZE);



      /*
      bbox = hands[0].boundingBox;
      bboxWidth = bbox.bottomRight[0] - bbox.topLeft[0];
      bboxHeight = bbox.bottomRight[1] - bbox.topLeft[1];
      console.log(bboxWidth);
      console.log(bboxHeight);
      console.log(bbox.topLeft[0],);
      console.log(bbox.topLeft[1]);
      console.log(hands[0].annotations);

      ctx.rect(bbox.topLeft[0], bbox.topLeft[1], bboxWidth, bboxHeight);
      ctx.stroke();
      console.log(bbox);
      */
    }
  });


  drawBackground(GAMESIZE, GAMESIZE, gameCtx);
  DuckHandler.CreateNewDuck(0.1);
  DuckHandler.DrawDucksAndUpdate(gameCtx);
  DuckHandler.DeleteDucks();

}

const drawCrosshair = (ctx, hands, SIZE) => {

  var r = SIZE * 0.05;
  ctx.save();
  ctx.beginPath();
  //ctx.translate(bbox.topLeft[0] + bboxWidth / 2, bbox.topLeft[1] + bboxHeight / 2);
  //console.log(hands[0].annotations.indexFinger)
  ctx.translate(hands[0].annotations.indexFinger[3][0], hands[0].annotations.indexFinger[3][1]);


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
