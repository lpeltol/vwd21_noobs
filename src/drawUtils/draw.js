import DuckHandler from "../components/duckHandler/DuckHandler";
import { drawScoreboard } from "./drawScoreboard";
import { handDetect } from "../components/HandTrack/handDetect"
import BGOHandler from "../components/BackGroundObjects/BackGroundObjects";

let bullet = true;
let lives = 10;
const VIDEOSIZE = 150;
var GAMESIZE;
let counter = 0;
let x = 0.5;
let y = 0.5;


var easy = {
  probability: 0.005,
  size: 600,
  speed: 0.001,
};

var medium = {
  probability: 0.01,
  size: 800,
  speed: 0.002,
};

var impossible = {
  probability: 0.015,
  size: 1000,
  speed: 0.003,
};

export const draw = (model, difficulty) => {
  switch (difficulty) {
    case "easy": {
      DuckHandler.InitializeDucks(easy);
      BGOHandler.initializeBGOHandler(easy);
      GAMESIZE = easy.size;
      break;
    }
    case "medium": {
      DuckHandler.InitializeDucks(medium);
      BGOHandler.initializeBGOHandler(medium);
      GAMESIZE = medium.size;
      break;
    }
    case "impossible": {
      DuckHandler.InitializeDucks(impossible);
      BGOHandler.initializeBGOHandler(impossible);
      GAMESIZE = impossible.size;
      break;
    }
    default: {
      DuckHandler.InitializeDucks(medium);
      BGOHandler.initializeBGOHandler(medium);
      GAMESIZE = medium.size;
      break;
    }
  }

  let startButton = document.getElementById("StartGame");
  startButton.style.display = "none";
  let gameOverMenu = document.getElementById("GameOver");
  let startGameMenu = document.getElementById("StartGame");
  gameOverMenu.style.display = "none";
  startGameMenu.style.display = "none";

  var video = document.getElementById("video");
  var videoCanvas = document.getElementById("videoCanvas");
  videoCanvas.height = VIDEOSIZE;
  videoCanvas.width = VIDEOSIZE;
  var videoCtx = videoCanvas.getContext("2d");

  var gameCanvas = document.getElementById("gameCanvas");
  gameCanvas.height = GAMESIZE;
  gameCanvas.width = GAMESIZE;
  var gameCtx = gameCanvas.getContext("2d");

  let intervalId = setInterval(function () {
    gameLoop(gameCanvas, videoCtx, gameCtx, video, model, intervalId);
  }, 10);
};

const gameLoop = (gameCanvas, videoCtx, gameCtx, video, model, intervalId) => {

  counter += 1;
  
  // HANDTRACK
  if (counter === 5) {
    var imgData = getVideoCanvasImageData(video, videoCtx, VIDEOSIZE, GAMESIZE, DuckHandler);
    var pos = handDetect(model, imgData)
    x = pos[0];
    y = pos[1];
    bullet = pos[2]
    counter = 0;
  }

  BGOHandler.createNewObject();
  BGOHandler.drawObjects(gameCtx);
  DuckHandler.CreateNewDuck();
  DuckHandler.DrawDucksAndUpdate(gameCtx);
  DuckHandler.DeleteDucks();
  drawCrosshair(gameCtx, x, y, GAMESIZE);

  if (DuckHandler.escapeCount === lives) {
    clearInterval(intervalId);
    let gameOverMenu = document.getElementById("GameOver");
    gameOverMenu.style.display = "flex";
    document.getElementById(
      "score"
    ).innerHTML = `Congratulations! You managed to hunt down ${DuckHandler.killCount} duck(s)!`;
  }
  drawScoreboard(
    gameCanvas,
    gameCtx,
    bullet,
    DuckHandler.killCount,
    lives,
    DuckHandler.escapeCount
  );
};

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
};

const getVideoCanvasImageData = (video, videoCtx) => {
  var min = Math.min(video.videoWidth, video.videoHeight);
  var sx = (video.videoWidth - min) / 2;
  var sy = (video.videoHeight - min) / 2;

  videoCtx.save();
  videoCtx.beginPath();
  videoCtx.clearRect(0, 0, VIDEOSIZE, VIDEOSIZE);
  videoCtx.drawImage(video, sx, sy, min, min, 0, 0, VIDEOSIZE, VIDEOSIZE);
  videoCtx.restore();

  return videoCtx.getImageData(0, 0, VIDEOSIZE, VIDEOSIZE);
};
