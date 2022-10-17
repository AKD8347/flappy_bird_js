//поле игры
const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')
//результаты
const result = document.getElementById('result');
const total = document.getElementById('total')
//кнопка перезагрузки игры
const restart = document.getElementById('restart');
// Создаем картинку
const img = new Image();
img.src = '/img/flappy_bird_bird.png'

let birdX = 200;
let birdY = 100;
let birdTime = null;
let stop = 0

//запускаем игру
function loadGame() {
    img.onload = function () {
        if (birdTime === null && stop === 0) {
            birdTime = setInterval(function () {

                if (birdY <= 350) {
                    birdY++
                }

                context.clearRect(0, 0, 800, 400)
                drawColumn()
                context.drawImage(img, 0, 0, 52, 45, birdX, birdY, 52, 45);
            }, 10)
        }
    }
}

let click = null

document.onmouseup = function () {
    if (stop === 0) {
        context.drawImage(img, 0, 0, 52, 45, birdX, birdY, 52, 45);
        clearInterval(click)
    }
}

document.onmousedown = function () {
    if (stop === 0) {
        click = setInterval(function () {
            context.drawImage(img, 104, 0, 52, 45, birdX, birdY, 52, 45);
            birdY = birdY - 2
        }, 10)
    }
}
// столб
let columnArr = []
let columnTimer = null

function createColumn() {
    columnTimer = setInterval(function () {
        let column = {};
        column.postionX = 800;
        column.postionY = -Math.round(Math.random() * 100 + 150);
        column.imgA = new Image();
        column.imgB = new Image();
        column.imgA.src = '/img/flappy_bird_pipeBottom.png';
        column.imgB.src = '/img/flappy_bird_pipeUp.png';
        column.id = new Date().getTime();

        columnArr.push(column);

    }, 1500)
}

//создаем колонны
createColumn();

let same = null;
let score = 0;

function drawColumn() {
    for (let i = 0; i < columnArr.length; i++) {
        columnArr[i].postionX--
        context.drawImage(columnArr[i].imgA, columnArr[i].postionX, columnArr[i].postionY - 100);
        context.drawImage(columnArr[i].imgB, columnArr[i].postionX, columnArr[i].postionY + 450);

        if (birdX + 40 >= columnArr[i].postionX && birdX - 70 <= columnArr[i].postionX) {
            if (columnArr[i].id != same) {
                score++;
                same = columnArr[i].id;
                let record = localStorage.getItem('record');
                if (score > record) {
                    localStorage.setItem('record', score);
                }
                result.innerText = score;
            }

            // Определяем столкновение
            if (birdY < columnArr[i].postionY + 300 || birdY + 35 > columnArr[i].postionY + 450) {
                clearInterval(columnTimer)
                clearInterval(birdTime)
                stop = 1
                result.innerText = score;
                let restartBox = document.querySelector('.box__restart');
                restartBox.classList.remove('box__restart--active');
                let record = localStorage.getItem('record');
                if (score > record) {
                    localStorage.setItem('record', score);
                }
            }
        }
    }
}

restart.addEventListener('click', () => {
    location.reload();
})

document.addEventListener("DOMContentLoaded", function () {
    loadGame();
    total.innerText = localStorage.getItem('record');
})
