import duckDown from './duckDown.png'
import duckUp from './duckUp.png'
import duckDead from './duckDead.png'
const SIZE = 600;

// class to handle all duck related things
export default class DuckHandler {

    // Initialize the variables
    static InitializeDucks() {
        this.DUCKS = []; // Contains all the ducks
        this.escapeCount = 0; // Keeps count how many ducks have escaped from the frame
        this.killCount = 0; // Keeps count how many the player has managed to shoot.
    }

    // Create new duck with pr% chance per frame.
    static CreateNewDuck(pr) {
        var ran = Math.random();
        if (ran > (1 - pr)) {
            this.DUCKS.push(new Duck());
        }
    }

    // Draw all ducks and update positions
    static DrawDucksAndUpdate(ctx) {
        this.DUCKS.forEach(duck => {
            duck.draw(ctx);
            duck.updatePosition();
        });
    }

    // Delete ducks which have flown away.
    static DeleteDucks() {
        this.DUCKS.forEach((duck, index) => {
            if (duck.y < 0 - duck.height) {
                this.DUCKS.splice(index, 1);
                this.escapeCount += 1;
            }
        });
    }

    // Mark duck ded if shot
    static KillDuck(x, y) {

        this.CreateShootingSound();

        this.DUCKS.forEach(duck => {
            if (x > duck.x && x < duck.x + duck.width && y > duck.y && y < duck.y + duck.height) {
                duck.dead = true;
                this.killCount += 1;
            }
        })
    }

    // Create epic sound to indicate shots fired.
    static CreateShootingSound() {

        var duration = 200;
        var audioCtx = new AudioContext();
        var osc = audioCtx.createOscillator();
        var gain = audioCtx.createGain()
        osc.connect(gain)
        gain.connect(audioCtx.destination)
        osc.frequency.value = 1000;
        osc.type = 'sine';
        gain.gain.setValueAtTime(0, audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0.5, audioCtx.currentTime + 0.1);
        osc.frequency.linearRampToValueAtTime(200, audioCtx.currentTime + duration / 1000);
        osc.start(audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration / 1000);
        osc.stop(audioCtx.currentTime + duration / 1000);
        setTimeout(function () {
            osc.disconnect();
        }, duration);

    }

}

// Class for duck
class Duck {

    // Constructor for the bird
    constructor() {
        this.side = this.StartSide();
        this.dead = false;
        this.x = (!this.side) ? -100 : SIZE + 100;
        this.y = this.randomNumber(Math.floor(SIZE / 2), SIZE)
        this.pose = false;
        this.xSpeed = (!this.side) ? 1 : -1;
        this.ySpeed = -this.randomNumber(1, 2);
        this.counter = 0;
        this.width = this.randomNumber(5, 100);
        this.height = this.randomNumber(5, 100);
        this.color = "#" + ((1 << 24) * Math.random() | 0).toString(16);
    }

    // Function to draw bird
    draw(ctx) {

        ctx.save();
        ctx.beginPath();
        ctx.translate(this.x, this.y)

       
        // If duck not ded
        if (!this.dead) {

            // Draw duck with wings up
            if (this.pose) {
                const img = new Image();
                //img.src = "./duckUp.png";
                img.src = duckUp;

                this.width = img.width;
                this.height = img.height;

                // Draw duck coming from left
                if (!this.side) {
                    ctx.drawImage(img, 0, 0);
                }

                // Draw duck coming from right
                else {
                    this.flipImage(img, 0, 0, ctx);
                }

                // Draw 10 frames with wings up and down
                if (this.counter == 10) {
                    this.pose = false;
                    this.counter = 0;
                }
            }

            // Draw duck with wings down.
            else {
                const img = new Image();
                //img.src = "duckDown.png";
                img.src = duckDown;

                this.width = img.width;
                this.height = img.height;

                if (!this.side) {
                    ctx.drawImage(img, 0, 0);
                }
                else {
                    this.flipImage(img, 0, 0, ctx);
                }
                if (this.counter == 10) {
                    this.pose = true;
                    this.counter = 0;
                }
            }
            this.counter += 1;
        }
        // If duck ded
        else {
            const img = new Image();
            img.src = duckDead;
            img.src = "duckDead.png";

            this.width = img.width;
            this.height = img.height;
            ctx.drawImage(img, 0, 0);
        }

        ctx.restore();
    }

    // Function to update the birds position
    updatePosition() {

        this.x += this.xSpeed;
        this.y += this.ySpeed;

        // Drop bird if he ded
        if (this.dead === true) {
            this.xSpeed = 0;
            this.ySpeed = 5;

            // Stop when hit ground
            if (this.y >= SIZE * 0.8) {
                this.ySpeed = 0;
            }
        }
    }

    // Function to draw image flipped. https://stackoverflow.com/questions/35973441/how-to-horizontally-flip-an-image
    flipImage(img, x, y, ctx) {
        ctx.save();
        ctx.translate(x + img.width, y);
        ctx.scale(-1, 1);
        ctx.drawImage(img, 0, 0);
        //ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.restore();
    }

    // Function to randomize the side the bird comes from
    StartSide() {

        var i = Math.random();

        if (i < 0.5) {
            // Left side
            return false;
        }
        else {
            // Right side
            return true;
        }
    }

    // Function to return random number between min and max
    randomNumber(min, max) {
        return Math.random() * (max - min) + min;
    }

}