const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const bird = new Image();
const bg = new Image();
const fg = new Image();
const pipeUp = new Image();
const pipeBottom = new Image();

bird.src = "/img/flappy_bird_bird.png";
bg.src = "/img/flappy_bird_bg.png";
fg.src = "/img/flappy_bird_fg.png";
pipeUp.src = "/img/flappy_bird_pipeUp.png";
pipeBottom.src = "/img/flappy_bird_pipeBottom.png";

let gap = 90;

// При нажатии на какую-либо кнопку
document.addEventListener("mousedown", moveUp);

function moveUp() {
    yPos -= 40;
    console.log(yPos)
}

// Создание блоков
let pipe = [];

pipe[0] = {
    x : canvas.width,
    y : 0
}

const score = 0;
// Позиция птички
var xPos = 10;
var yPos = 150;
var grav = 1.5;

function draw() {
    context.drawImage(bg, 0, 0);

    for(let i = 0; i < pipe.length; i++) {
        context.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        context.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

        pipe[i].x--;

        if(pipe[i].x == 125) {
            pipe.push({
                x : canvas.width,
                y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            });
        }

        // Отслеживание прикосновений
        if(xPos + bird.width >= pipe[i].x
            && xPos <= pipe[i].x + pipeUp.width
            && (yPos <= pipe[i].y + pipeUp.height
                || yPos + bird.height >= pipe[i].y + pipeUp.height + gap) || yPos + bird.height >= canvas.height - fg.height) {
            location.reload(); // Перезагрузка страницы
        }

        if(pipe[i].x == 5) {
            score++;
            // score_audio.play();
        }
    }

    // context.drawImage(fg, 0, canvas.height - fg.height);
    context.drawImage(bird, xPos, yPos);

    yPos += grav;

    // context.fillStyle = "#000";
    // context.font = "24px Verdana";
    // context.fillText("Счет: " + score, 10, canvas.height - 20);

    requestAnimationFrame(draw);
}

pipeBottom.onload = draw;
