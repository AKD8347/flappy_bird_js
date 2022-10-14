//поле игры
const gameField = document.getElementById("canvas");
const gameFieldContext = gameField.getContext("2d");
//Создаем обьекты игры
const bird = new Image();
const background = new Image();
const flor = new Image();
const pipeUp = new Image();
const pipeBottom = new Image();
//указываем путь до изображения
bird.src = "img/bird.png";
background.src = "img/bg.png";
flor.src = "img/fg.png";
pipeUp.src = "img/pipeUp.png";
pipeBottom.src = "img/pipeBottom.png";

console.log(bird);

var gap = 90;

// При нажатии на какую-либо кнопку
document.addEventListener("keydown", moveUp);

function moveUp() {
    yPos -= 25;
}

// Создание блоков
var pipe = [];

pipe[0] = {
    x : gameField.width,
    y : 0
}

var score = 0;
// Позиция птички
var xPos = 10;
var yPos = 150;
var grav = 1.5;

function draw() {
    gameFieldContext.drawImage(background, 0, 0);

    for(var i = 0; i < pipe.length; i++) {
        gameFieldContext.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        gameFieldContext.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

        pipe[i].x--;

        if(pipe[i].x == 125) {
            pipe.push({
                x : gameField.width,
                y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            });
        }

        // Отслеживание прикосновений
        if(xPos + bird.width >= pipe[i].x
            && xPos <= pipe[i].x + pipeUp.width
            && (yPos <= pipe[i].y + pipeUp.height
                || yPos + bird.height >= pipe[i].y + pipeUp.height + gap) || yPos + bird.height >=gameField.height - flor.height) {
            location.reload(); // Перезагрузка страницы
        }

        if(pipe[i].x == 5) {
            score++;
        }
    }

    gameFieldContext.drawImage(flor, 0, gameField.height - flor.height);
    gameFieldContext.drawImage(bird, xPos, yPos);

    yPos += grav;

    gameFieldContext.fillStyle = "#000";
    gameFieldContext.font = "24px Verdana";
    gameFieldContext.fillText("Счет: " + score, 10, gameField.height - 20);

    requestAnimationFrame(draw);
}

pipeBottom.onload = draw;
