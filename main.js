// Size of the game area (in px)
const GAME_AREA_WIDTH = 700
const GAME_AREA_HEIGHT = 500

// Paddles
const PADDLE_HEIGHT = 100
const PADDLE_WIDTH = 20
const PADDLE_SPEED = 1.5

const computerPaddle = document.querySelector('.computer-paddle')
let computerPaddleYPosition = 250
let computerPaddleYVelocity = 0

const playerPaddle = document.querySelector('.player-paddle')
let playerPaddleYPosition = 0
let playerPaddleYVelocity = 0

// Ball 
const ball = document.querySelector('.ball')
const BALL_SIZE = 20
const BALL_START_X = 350
const BALL_START_Y = 250

const ballVelocityXGain = 0.1
const ballVelocityYGain = 0.1
let ballPositionX = BALL_START_X
let ballPositionY = BALL_START_Y
let ballVelocityX = 2
let ballVelocityY = Math.random() < 0.5 ? -1 : 1;

// Reset
function reset() {
    ballVelocityX = 2
    ballVelocityY = Math.random() < 0.5 ? -1 : 1;
    ballPositionX = BALL_START_X
    ballPositionY = BALL_START_Y
}

// Scoring
const txt_scorePlayer = document.querySelector('.score-player')
const txt_scoreComputer = document.querySelector('.score-computer')

let scorePlayer = 0
let scoreComputer = 0

function score(who) {
    if (who === 'CPU') {
        console.log("Player L")
        scoreComputer++
    } else {
        scorePlayer++
        console.log("CPU L")
    }
    txt_scorePlayer.innerHTML = "PLR: " + scorePlayer
    txt_scoreComputer.innerHTML = "CPU: " + scoreComputer
    reset()
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

    console.log(ballVelocityX,ballVelocityY)

    // #### Ball Logic ###

    // Test the CPU Paddle
    if ((ballPositionX + BALL_SIZE + PADDLE_WIDTH) > GAME_AREA_WIDTH) {
        if (ballPositionY > computerPaddleYPosition && ballPositionY < (computerPaddleYPosition + PADDLE_HEIGHT)) {
            ballVelocityX = -(Math.abs(ballVelocityX) + ballVelocityXGain)
        } else {
            score('PLR')
        }
    // Test the Player Paddle
    } else if ((ballPositionX - PADDLE_WIDTH) < 0) {
        if (ballPositionY > playerPaddleYPosition && ballPositionY < (playerPaddleYPosition + PADDLE_HEIGHT)) {
            ballVelocityX = Math.abs(ballVelocityX) + ballVelocityXGain
        } else {
            score('CPU')
        }
    }

    // Test the top and bottom boundaries
    if ((ballPositionY + BALL_SIZE) > GAME_AREA_HEIGHT) {
        ballVelocityY = -(Math.abs(ballVelocityY) + ballVelocityXGain)
    } else if (ballPositionY < 0) {
        ballVelocityY = Math.abs(ballVelocityY) + ballVelocityXGain
    }

    // Update the ball position
    ballPositionX += ballVelocityX
    ballPositionY += ballVelocityY
    ball.style.left = ballPositionX + 'px'
    ball.style.top = ballPositionY + 'px'


    // ### CPU Logic ###

    // Update the computer paddle's position
    let computerPaddleMiddle = computerPaddleYPosition + PADDLE_HEIGHT/2
    let computerPaddleTarget = ballPositionY + BALL_SIZE/2

    if (computerPaddleMiddle === computerPaddleTarget) {
        computerPaddleYVelocity = 0
    } else if (computerPaddleMiddle < computerPaddleTarget) {
        computerPaddleYVelocity = PADDLE_SPEED
    } else if (computerPaddleMiddle > computerPaddleTarget) {
        computerPaddleYVelocity = -PADDLE_SPEED
    }

    // CPU boundaries
    if (computerPaddleYPosition + PADDLE_HEIGHT > GAME_AREA_HEIGHT) {
        computerPaddleYPosition = GAME_AREA_HEIGHT - PADDLE_HEIGHT
    } else if (computerPaddleYPosition < 0) {
        computerPaddleYPosition = 0
    }

    // CPU movement update
    computerPaddleYPosition += computerPaddleYVelocity
    computerPaddle.style.top = `${computerPaddleYPosition}px`

    // ### Player Logic ###

    // Update the player paddle's position based on input
    if (input_Down) {
        playerPaddleYVelocity = PADDLE_SPEED
    } else if (input_Up) {
        playerPaddleYVelocity = -PADDLE_SPEED
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