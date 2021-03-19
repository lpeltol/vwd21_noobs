// https://mixkit.co/free-sound-effects/gun/
import reload from "../../sounds/reload.wav";
var x;
var y;
const numAvgPos = 5;
var xPositions = [];
var yPositions = [];

export const handDetect = (model, imgData, VIDEOSIZE, GAMESIZE, bullet, DuckHandler) => {

    model.detect(imgData).then((predictions) => {

        if (predictions?.[0]?.bbox !== undefined) {
            x = predictions[0].bbox[0] + predictions[0].bbox[2] / 2;
            y = predictions[0].bbox[1] + predictions[0].bbox[3] / 2;
            var positions = calculateAveragePosition(x, y);
            x = positions[0] / VIDEOSIZE;
            y = positions[1] / VIDEOSIZE;

            var ratio = predictions[0].bbox[2] / predictions[0].bbox[3];

            var x1 = x - 0.5;
            var y1 = y - 0.5;
            var a = 2;
            x = x + x1 / a;
            y = y + y1 / a;

            // When hand is spread → Hands boundingboxes ratio of vertical and horizontal lines length approaches 1
            if (ratio >= 0.7 && bullet === true) {
                DuckHandler.CreateShootingSound();
                DuckHandler.KillDuck(x * GAMESIZE, y * GAMESIZE);
                bullet = false;
            }

            // When hand is closed → Hands boundingboxes ratio of vertical and horizontal lines length approaches 0.5
            if (ratio <= 0.6 && bullet === false) {
                var reloadSound = new Audio(reload);
                reloadSound.play();
                bullet = true;
            }
        }
    })

    return [x, y, bullet]
}

const calculateAveragePosition = (x, y) => {
    if (xPositions.length < numAvgPos) {
      xPositions.push(x);
      yPositions.push(y);
    } else {
      xPositions.push(x);
      yPositions.push(y);
  
      xPositions.splice(0, 1);
      yPositions.splice(0, 1);
    }
  
    // https://jrsinclair.com/articles/2019/five-ways-to-average-with-js-reduce/
    var xAvg = xPositions.reduce((a, b) => a + b) / xPositions.length;
    var yAvg = yPositions.reduce((a, b) => a + b) / yPositions.length;
  
    return [xAvg, yAvg];
  };