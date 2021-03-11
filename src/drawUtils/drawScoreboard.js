export const drawScoreboard = (ctx, bullet, score, lives, livesLeft) => {
  ctx.save();
  ctx.scale(1, 1);
  ctx.font = "500 18px Verdana";
  ctx.fillStyle = "white";
  ctx.fillText(`BULLETS: ${bullet ? "1" : "0"}`, 5, 550);
  ctx.fillText(`SCORE: ${score ? score : "0"}`, 5, 570);
  ctx.fillText(`LIVES: ${livesLeft ? lives - livesLeft : lives}`, 5, 590);
  ctx.restore();
};
