import duckDown from './duckDown.png'
import duckUp from './duckUp.png'
import duckDead from './duckDead.png'

import shoot from '../../sounds/shoot.mp3'

const imgDuckDown = new Image();
imgDuckDown.src = duckDown;
const imgDuckUp = new Image();
imgDuckUp.src = duckUp;
const imgDuckDead = new Image();
imgDuckDead.src = duckDead;
var IMAGEWIDTH;
var IMAGEHEIGHT;

// class to handle all duck related things
export default class DuckHandler {

    // Initialize the variables
    static InitializeDucks(difficulty) {
        this.DUCKS = []; // Contains all the ducks
        this.escapeCount = 0; // Keeps count how many ducks have escaped from the frame
        this.killCount = 0; // Keeps count how many the player has managed to shoot.
        this.difficulty = difficulty;
        IMAGEWIDTH = imgDuckDown.width;
        IMAGEHEIGHT = imgDuckDown.height;
    }

    // Create new duck with pr% chance per frame.
    static CreateNewDuck() {
        var ran = Math.random();
        if (ran > (1 - this.difficulty.probability)) {
            this.DUCKS.push(new Duck(this.difficulty));
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
        var shootSound = new Audio(shoot)
        shootSound.play();
    }

}

// Class for duck
class Duck {

    // Constructor for the bird
    constructor(difficulty) {
        this.size = difficulty.size;
        this.side = (Math.random() > 0.5) ? true : false;
        this.dead = false;
        this.x = (!this.side) ? -IMAGEWIDTH : this.size + IMAGEWIDTH;
        this.y = this.randomNumber(Math.floor(this.size * 0.8), this.size)
        this.pose = false;
        this.xSpeed = (!this.side) ? difficulty.speed * this.size : -difficulty.speed * this.size;
        this.ySpeed = -this.size * difficulty.speed;
        this.counter = 0;
        this.width = IMAGEWIDTH;
        this.height = IMAGEHEIGHT;
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
                // const img = new Image();
                // img.src = duckUp;

                // Draw duck coming from left
                if (!this.side) {
                    ctx.drawImage(imgDuckUp, 0, 0);
                }

                // Draw duck coming from right
                else {
                    this.flipImage(imgDuckUp, 0, 0, ctx);
                }

                // Draw 10 frames with wings up and down
                if (this.counter == 10) {
                    this.pose = false;
                    this.counter = 0;
                }
            }

            // Draw duck with wings down.
            else {

                if (!this.side) {
                    ctx.drawImage(imgDuckDown, 0, 0);
                }
                else {
                    this.flipImage(imgDuckDown, 0, 0, ctx);
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
            ctx.drawImage(imgDuckDead, 0, 0);
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
            if (this.y >= this.size * 0.8) {
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