export const drawScoreboard = (ctx, bullet, score, lives, livesLeft) => {
  ctx.save();
  ctx.scale(1, 1);
  ctx.font = "500 12px Verdana";
  ctx.fillStyle = "white";
  ctx.fillText(`BULLETS: ${bullet ? "1" : "0"}`, 5, 360);
  ctx.fillText(`SCORE: ${score ? score : "0"}`, 5, 375);
  ctx.fillText(`LIVES: ${livesLeft ? lives - livesLeft : lives}`, 5, 390);
  ctx.restore();
};
