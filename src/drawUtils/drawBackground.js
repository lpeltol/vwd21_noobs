export const drawBackground = (width, height, ctx) => {
  ctx.beginPath();
  ctx.fillStyle = "skyblue";
  ctx.rect(0, 0, width, height * 0.75);
  ctx.fill();

  ctx.beginPath();
  ctx.fillStyle = "green";
  ctx.rect(0, height * 0.75, width, height * 0.5);
  ctx.fill();
};
