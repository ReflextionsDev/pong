// Size of the game area (in px)
const GAME_AREA_WIDTH = 700;
const GAME_AREA_HEIGHT = 500;

// Size of the paddles (in px)
const PADDLE_HEIGHT = 100;
const PADDLE_WIDTH = 20;

// Size of the ball (in px)
const BALL_SIZE = 20;

// Get the computer paddle element
const computerPaddle = document.querySelector('.computer-paddle');

// The y-velocity of the computer paddle
let computerPaddleYPosition = 0;
let computerPaddleYVelocity = 1;

// Update the pong world
const ball = document.querySelector('.ball');

let ballPositionX = 100;
let ballPositionY = 170;


let ballVelocityX = 2;
let ballVelocityY = 1;



function update() {


    // Update the ball position
    if ((ballPositionX + BALL_SIZE) > GAME_AREA_WIDTH) {
        ballVelocityX = -ballVelocityX
    } else if (ballPositionX < 0) {
        ballVelocityX = -ballVelocityX
    }

    if ((ballPositionY + BALL_SIZE) > GAME_AREA_HEIGHT) {
        ballVelocityY = -ballVelocityY
    } else if (ballPositionY < 0) {
        ballVelocityY = -ballVelocityY
    }


    ballPositionX += ballVelocityX
    ballPositionY += ballVelocityY

    ball.style.left = ballPositionX + 'px'
    ball.style.top = ballPositionY + 'px'


    // Update the computer paddle's position
    computerPaddleYPosition = computerPaddleYPosition + computerPaddleYVelocity
    computerPaddle.style.top = `${computerPaddleYPosition}px`
}

// Call the update() function every 35ms
setInterval(update, 5);
