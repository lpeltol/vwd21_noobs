export default class BGOHandler {
  static initializeBGOHandler(difficulty) {
    this.objects = [];
    this.pr = 0.005;
    this.difficulty = difficulty;
    this.size = difficulty.size;
  }

  static createNewObject() {
    var ran = Math.random();
    if (ran > 1 - this.pr) {
      this.objects.push(new Cloud(this.difficulty));
    }
  }

  static drawObjects(ctx) {
    this.objects.forEach((object) => {
      object.draw(ctx);
      object.update();
      console.log(object);
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
    this.speed = 0.001;
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.scale(this.size, this.size);
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.strokeStyle = "white";
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
