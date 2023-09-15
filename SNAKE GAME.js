const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const reset = document.querySelector("#reset");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const bckgrnd = new Image();
bckgrnd.src = "grass.jpg";
const snakeColor = "yellow";
const snakeBorder = "black";
const appleImage = new Image();
appleImage.src = "apple.jpg";
const unitSize = 25;
let running = false;
let xVelocity = unitSize;
let yVelocity = 0;
let appleX;
let appleY;
let score = 0;
let snake = [
    { x: unitSize * 4, y: 0 },
    { x: unitSize * 3, y: 0 },
    { x: unitSize * 2, y: 0 },
    { x: unitSize, y: 0 },
    { x: 0, y: 0 }
];

window.addEventListener("keydown", changeDirection);
reset.addEventListener("click", resetGame);

gameStart();

function gameStart() {
    running = true;
    scoreText.textContent = score;
    createApple();
    drawApple();
    nextTick();
};
function nextTick() {
    if (running == true) {
        setTimeout(() => {
            clearBoard();
            drawApple();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        }, 80);
    }
    else
        displayGameOver();
};
function clearBoard() {
    ctx.drawImage(bckgrnd, 0, 0, gameWidth, gameHeight);
};
function createApple() {
    function randFood(min, max) {
        const randNum = Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
        return randNum;
    }
    appleX = randFood(0, gameWidth - unitSize);
    appleY = randFood(0, gameHeight - unitSize);
};
function drawApple() {
    ctx.drawImage(appleImage, appleX, appleY, unitSize, unitSize);
};
function moveSnake() {
    const head = {
        x: snake[0].x + xVelocity,
        y: snake[0].y + yVelocity
    };

    snake.unshift(head); 
    if (snake[0].x == appleX && snake[0].y == appleY) {
        score = score + 1;
        scoreText.textContent = score;
        createApple();
    }
    else
        snake.pop();
};
function drawSnake() {
    ctx.fillStyle = snakeColor;
    ctx.strokeStyle = snakeBorder;
    snake.forEach(part => {
        ctx.fillRect(part.x, part.y, unitSize, unitSize);
        ctx.strokeRect(part.x, part.y, unitSize, unitSize);
    })
};
function changeDirection(event) {
    const keyPressed = event.keyCode;

    const LEFT = 37;
    const UP = 38;
    const RIGHT = 39;
    const DOWN = 40;

    const goUp = (yVelocity == -unitSize);
    const goDown = (yVelocity == unitSize);
    const goRight = (xVelocity == unitSize);
    const goLeft = (xVelocity == -unitSize);

    switch (true) {
        case (keyPressed == LEFT && !goRight):
            xVelocity = -unitSize;
            yVelocity = 0;
            break;
        case (keyPressed == UP && !goDown):
            xVelocity = 0;
            yVelocity = -unitSize;
            break;
        case (keyPressed == RIGHT && !goLeft):
            xVelocity = unitSize;
            yVelocity = 0;
            break;
        case (keyPressed == DOWN && !goUp):
            xVelocity = 0;
            yVelocity = unitSize;
            break;
    }
};
function checkGameOver() {
    switch (true) {
        case (snake[0].x < 0):
            running = false;
            break;
        case (snake[0].x >= gameWidth):
            running = false;
            break;
        case (snake[0].y < 0):
            running = false;
            break;
        case (snake[0].y >= gameHeight):
            running = false;
            break;
    }

    for (let i = 1; i < snake.length; i++){
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y)
            running = false;
    }
};
function displayGameOver() {
    ctx.font = "50px MV Boli";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER!", gameWidth / 2, gameHeight / 2);
    running = false;

 };
function resetGame() {
    score = 0;
    xVelocity = unitSize;
    yVelocity = 0;

    snake = [
        { x: unitSize * 4, y: 0 },
        { x: unitSize * 3, y: 0 },
        { x: unitSize * 2, y: 0 },
        { x: unitSize, y: 0 },
        { x: 0, y: 0 }
    ];
    gameStart();
 };



