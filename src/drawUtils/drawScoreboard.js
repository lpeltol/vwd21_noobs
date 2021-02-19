export const drawScoreboard = (ctx, bullet) => {
  ctx.save();
  ctx.scale(1, 1);
  ctx.font = "20px Verdana";
  ctx.fillStyle = "tomato";
  ctx.fillText(`BULLETS: ${bullet ? "1" : "0"}`, 5, 430);
  ctx.fillText("SCORE: ", 5, 460);
  ctx.fillText("LIVES: ", 5, 490);
  ctx.restore();
};
