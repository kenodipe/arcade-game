// Enemies our player must avoid
var Enemy = function(y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = 0;
    this.y = y;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};
// set enemy boundary points
Enemy.prototype.xMax = 505; 

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // chech that x is not larger than canvas width; canvas width currently set to 505 in engine.js

    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
     // check collision
    const speeds = [-100, -75, -50, -25, 0, 25, 50, 75, 100, 125, 150, 175];
    const yPosition = [60, 145, 230];
    if (this.x <= 505) {
        if (this.isCollision()) {
            if (player.lives >= 2) {
                reduceLives(player);
                console.log(player.lives)
                player.resetPosition();
                
            } else {
                reduceLives(player);
                // modal
                // ctx.resetTransform();
                displayDialog();
            }

            
        }
        this.x += (this.speed + this.variableSpeed) * dt ;
    } else {
        this.x = -100;
        const yIndex = Math.floor(Math.random() * 3);
        this.y = yPosition[yIndex];
        const speedIndex = Math.floor(Math.random() * 12);
        this.variableSpeed = speeds[speedIndex];
    }
}

Enemy.prototype.isCollision = function() {
    return (Math.abs(this.y - player.y) === 10) && (Math.abs(this.x - player.x) < 75);
    
}


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.x = 202;
    this.y = 410;
    this.points = 0;
    this.lives = 3;
    this.sprite = 'images/char-boy.png';
}

// set max and min for x and y 
Player.prototype.yMax = 410;
Player.prototype.yMin = 0;
Player.prototype.xMax = 402;
Player.prototype.xMin = 2;


Player.prototype.update = function() {
    if (this.x >= this.xMax ) {
        this.x = this.xMax;
    } 
    if (this.x <= this.xMin) {
        this.x = this.xMin;
    }
    // if player is in the water zone
    if (this.y <= this.yMin ) {
        // update score
        // reset the player position
        updatePlayerPoints(this);
        this.resetPosition();
    }
    if (this.y >= this.yMax) {
        this.y = this.yMax;
    }
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(direction) {

    switch (direction) {
        case 'up':
            this.y -= 85;
            console.log('up key pressed');
            break;
        case 'down':
            this.y += 85;
            console.log('down key pressed');
            break;
        case 'left':
            this.x -= 100;
            console.log('left key pressed');
            break;
        case 'right':
            this.x += 100;
            console.log('right key pressed');
            break;
    }

}

Player.prototype.resetPosition = function() {
    // starting point for player
    this.x = 202;
    this.y = 410;
}



// Now instantiate your objects.
const enemy1 = new Enemy(60, 200);
const enemy2 = new Enemy(145, 200);
const enemy3 = new Enemy(230, 200);
const enemy4 = new Enemy(60, 150);



// Place all enemy objects in an array called allEnemies
var allEnemies = [enemy1, enemy2, enemy3, enemy4];
// Place the player object in a variable called player

var player = new Player();



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

/**
 * helper functio that updates player points and update html
 * @param {*} player 
 */
const updatePlayerPoints = (player) => {
    player.points += 100;
    const score = document.getElementById('score');
    score.innerText = player.points;
}

/**
 * helper function that reduce player lives and update html
 * @param {*} player 
 */
const reduceLives = (player) => {
    
    const icon = document.getElementById(`heart${player.lives}`);
    if (player.lives >= 1) icon.setAttribute('name', 'heart-empty');
    player.lives -= 1;
}

const dialog = document.getElementById('dialog');
// display game end dialog
const displayDialog = () => {
    const points = document.getElementById('points');
    points.innerHTML = player.points;
    if (!dialog.open) dialog.showModal(); 
}

const replay = document.getElementById('replay');
replay.addEventListener('click', () => {
    location.reload();
});

// close dialog when cancel button is clicked
document.getElementById('cancel').addEventListener('click', () => dialog.close());