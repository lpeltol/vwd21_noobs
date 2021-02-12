let bullet = true;
let shots = [];

export const draw = (bbox, video) => {
  if (bbox) {
    var canvas = document.querySelector("canvas");
    var ctx = canvas.getContext("2d");

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
  }
};
