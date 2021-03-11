export const drawScoreboard = (ctx, bullet, score, livesLeft) => {
  ctx.save();
  ctx.scale(1, 1);
  ctx.font = "20px Verdana";
  ctx.fillStyle = "tomato";
  ctx.fillText(`BULLETS: ${bullet ? "1" : "0"}`, 5, 330);
  ctx.fillText(`SCORE: ${score ? score : ''}`, 5, 360);
  ctx.fillText(`LIVES: ${livesLeft ? livesLeft : ''}`, 5, 390);
  ctx.restore();
};
