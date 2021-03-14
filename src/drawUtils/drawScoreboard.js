export const drawScoreboard = (
  canvas,
  ctx,
  bullet,
  score,
  lives,
  livesLeft
) => {
  ctx.save();
  ctx.scale(1, 1);
  var boldness = Math.floor(canvas.height / 10);
  var textSize = Math.floor(canvas.height / 50);
  ctx.font = boldness + " " + textSize + "px Verdana";
  ctx.fillStyle = "white";
  ctx.fillText(`BULLETS: ${bullet ? "1" : "0"}`, 5, canvas.height * 0.89);
  ctx.fillText(`SCORE: ${score ? score : "0"}`, 5, canvas.height * 0.94);
  ctx.fillText(
    `LIVES: ${livesLeft ? lives - livesLeft : lives}`,
    5,
    canvas.height * 0.99
  );
  ctx.restore();
};
