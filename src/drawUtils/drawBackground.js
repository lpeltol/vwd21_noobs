export const drawBackground = (width, height, ctx) => {
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
