export const drawBackground = (width, height, ctx) => {
  ctx.save();
  ctx.beginPath();
  ctx.fillStyle = "skyblue";
  ctx.rect(0, 0, width, height);
  ctx.fill();
  ctx.restore();

  ctx.save();
  ctx.beginPath();
  ctx.moveTo(0, height * 0.8);
  ctx.fillStyle = "green";
  ctx.bezierCurveTo(width * 0.33, height * 0.5, width * 0.66, height * 0.9, width, height * 0.8);
  ctx.lineTo(width, height);
  ctx.lineTo(0, height);
  ctx.lineTo(0, height * 0.8);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
};
