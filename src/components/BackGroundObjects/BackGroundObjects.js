export default class BGOHandler {
  static initializeBGOHandler(difficulty) {
    this.objects = [];
    this.pr = 0.002;
    this.difficulty = difficulty;
    this.size = difficulty.size;
    this.skyObject = new CelestialObject(difficulty.size);
  }

  static createNewObject() {
    var ran = Math.random();
    if (ran > 1 - this.pr) {
      this.objects.push(new Cloud(this.difficulty));
    }
  }

  static drawObjects(ctx) {
    drawBackground(
      this.size,
      ctx,
      this.skyObject.color === "yellow" ? "skyblue" : "#001C39",
      this.skyObject.color === "yellow" ? "green" : "#001A00"
    );

    this.skyObject.draw(ctx);
    this.skyObject.update();

    this.objects.forEach((object) => {
      this.skyObject.color === "yellow"
        ? (object.color = "white")
        : (object.color = "lightgray");
      object.draw(ctx);
      object.update();
    });
  }

  deleteObjects() {
    this.objects.forEach((object, index) => {
      if (object.x > this.size) {
        this.objects.splice(index, 1);
      }
    });
  }
}

class Cloud {
  constructor(difficulty) {
    this.size = difficulty.size;
    this.width = Math.random() * (0.3 - 0.1) + 0.1;
    this.height = this.width / 2;
    this.x = -this.width * this.size;
    this.y = (Math.random() * (0.5 - 0.2) + 0.2) * this.size;
    this.speed = 0.0008;
    this.color = "white";
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.scale(this.size, this.size);
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 0.005;

    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(
      this.width * 0.01,
      -this.height * 0.96,
      this.width * 0.13,
      -this.height * 0.96,
      this.width * 0.33,
      -this.height * 0.5
    );
    ctx.bezierCurveTo(
      this.width * 0.4,
      -this.height * 0.92,
      this.width * 0.56,
      -this.height * 0.95,
      this.width * 0.66,
      -this.height * 0.4
    );
    ctx.bezierCurveTo(
      this.width * 0.78,
      -this.height * 0.82,
      this.width * 0.92,
      -this.height * 0.52,
      this.width,
      0
    );

    ctx.lineTo(0, 0);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  update() {
    this.x += this.size * this.speed;
  }
}

class CelestialObject {
  constructor(size) {
    this.size = size;
    this.radius = 0.025;
    this.x = -this.radius * 2 * this.size;
    this.y = this.size / 2;
    this.xspeed = 0.001 * this.size;
    this.yspeed = (-0.001 / 2) * this.size;
    this.t = 0;
    this.color = "yellow";
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.scale(this.size, this.size);
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }

  update() {
    this.t += this.xspeed / this.size;

    // https://stackoverflow.com/questions/5634460/quadratic-b%C3%A9zier-curve-calculate-points
    this.x =
      (1 - this.t) * (1 - this.t) * this.size * 0 +
      2 * (1 - this.t) * this.t * this.size * 0.5 +
      this.t * this.t * this.size;
    this.y =
      ((1 - this.t) * (1 - this.t) * this.size) / 2 +
      2 * (1 - this.t) * this.t * this.size * 0.0 +
      (this.t * this.t * this.size) / 2;

    if (this.x > this.radius * 2 * this.size + this.size) {
      this.color =
        this.color === "gray" ? (this.color = "yellow") : (this.color = "gray");
      this.x = -this.radius * this.size;
      this.y = this.size / 2;
      this.t = 0;
    }
  }
}

const drawBackground = (size, ctx, skyColor, groundColor) => {
  ctx.save();
  ctx.beginPath();
  ctx.fillStyle = skyColor;
  ctx.rect(0, 0, size, size);
  ctx.fill();
  ctx.restore();

  ctx.save();
  ctx.beginPath();
  ctx.moveTo(0, size * 0.8);
  ctx.fillStyle = groundColor;
  ctx.bezierCurveTo(
    size * 0.33,
    size * 0.5,
    size * 0.66,
    size * 0.9,
    size * 1.0,
    size * 0.8
  );
  ctx.lineTo(size, size);
  ctx.lineTo(0, size);
  ctx.lineTo(0, size * 0.8);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
};
