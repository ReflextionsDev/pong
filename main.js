// Size of the game area (in px)
const GAME_AREA_WIDTH = 700;
const GAME_AREA_HEIGHT = 500;

// Paddles
const PADDLE_HEIGHT = 100;
const PADDLE_WIDTH = 20;

const computerPaddle = document.querySelector('.computer-paddle');
let computerPaddleYPosition = 0
let computerPaddleYVelocity = 1

const playerPaddle = document.querySelector('.player-paddle');
let playerPaddleYPosition = 0
let playerPaddleYVelocity = 0

// Ball 
const ball = document.querySelector('.ball');
const BALL_SIZE = 20;
const BALL_START_X = 100;
const BALL_START_Y = 100

let ballPositionX = BALL_START_X
let ballPositionY = BALL_START_Y
let ballVelocityX = 2;
let ballVelocityY = 1;

// Reset
function reset() {
    ballPositionX = BALL_START_X
    ballPositionY = BALL_START_Y
    ballVelocityX = 2;
    ballVelocityY = 1;
}

// Player controls
let input_Down = 0, input_Up = 0

document.addEventListener('keydown', (event) => {
    if (event.key === 'w' || event.key === 'ArrowUp') {
        input_Up = 1
    } else if (event.key === 's' || event.key === 'ArrowDown') {
        input_Down = 1
    }
})

document.addEventListener('keyup', (event) => {
    if (event.key === 'w' || event.key === 'ArrowUp') {
        input_Up = 0
    } else if (event.key === 's' || event.key === 'ArrowDown') {
        input_Down = 0
    }
})

// Game Update
setInterval(update, 5);

function update() {

    // #### Ball Logic ###

    // Test the CPU Paddle
    if ((ballPositionX + BALL_SIZE + PADDLE_WIDTH) > GAME_AREA_WIDTH) {

        if (ballPositionY > computerPaddleYPosition && ballPositionY < (computerPaddleYPosition + PADDLE_HEIGHT)) {

            console.log("CPU Bounce")
            console.log(computerPaddleYPosition, ballPositionY)

            ballVelocityX = -ballVelocityX
        } else {
            
            console.log("CPU L")

            reset()
        }

    // Test the Player Paddle
    } else if ((ballPositionX - PADDLE_WIDTH) < 0) {

        if (ballPositionY > playerPaddleYPosition && ballPositionY < (playerPaddleYPosition + PADDLE_HEIGHT)) {
            console.log("Player Bounce")
            console.log(playerPaddleYPosition, ballPositionY)
            ballVelocityX = -ballVelocityX
        } else {
            console.log("Player L")
            reset()
        }


    }

    // Test the top and bottom boundaries
    if ((ballPositionY + BALL_SIZE) > GAME_AREA_HEIGHT) {
        ballVelocityY = -ballVelocityY
    } else if (ballPositionY < 0) {
        ballVelocityY = -ballVelocityY
    }

    // Update the ball position
    ballPositionX += ballVelocityX
    ballPositionY += ballVelocityY
    ball.style.left = ballPositionX + 'px'
    ball.style.top = ballPositionY + 'px'


    // ### CPU Logic ###

    // Update the computer paddle's position

    // if (computerPaddleYPosition > ballPositionY) {
    //     computerPaddleYVelocity = 0
    //     console.log("IN RANGE", computerPaddleYVelocity)
    // } else if (computerPaddleYPosition > ballPositionY) {
    //     computerPaddleYVelocity = -5
    //     console.log("BELOW BALL", computerPaddleYVelocity)
    // } else if (computerPaddleYPosition < ballPositionY) {
    //     computerPaddleYVelocity = 5
    //     console.log("ABOVE BALL", computerPaddleYVelocity)
    // } 
    


    // CPU boundaries
    if (computerPaddleYPosition + PADDLE_HEIGHT > GAME_AREA_HEIGHT) {
        computerPaddleYVelocity = -computerPaddleYVelocity
    } else if (computerPaddleYPosition < 0) {
        computerPaddleYVelocity = -computerPaddleYVelocity
    }


    // CPU movement update
    computerPaddleYPosition += computerPaddleYVelocity
    computerPaddle.style.top = `${computerPaddleYPosition}px`

    // ### Player Logic ###

    // Update the player paddle's position based on input
    if (input_Down) {
        playerPaddleYVelocity = 1
    } else if (input_Up) {
        playerPaddleYVelocity = -1
    } else {
        playerPaddleYVelocity = 0
    }

    // Paddle boundaries
    if (playerPaddleYPosition + PADDLE_HEIGHT > GAME_AREA_HEIGHT) {
        playerPaddleYPosition = GAME_AREA_HEIGHT - PADDLE_HEIGHT
    } else if (playerPaddleYPosition < 0) {
        playerPaddleYPosition = 0
    }

    // Paddle movement update
    playerPaddleYPosition += playerPaddleYVelocity
    playerPaddle.style.top = `${playerPaddleYPosition}px`
}