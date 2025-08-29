const canvas = document.getElementById("game");
const score = document.getElementById("score");

let valScore = 0;
const rowCount = 25;
const columnCount = 19;
const tileSize = 32;

const boardWidth = columnCount * tileSize;
const boardHeight = rowCount * tileSize;

canvas.height = boardHeight;
canvas.width = boardWidth;

let context = canvas.getContext("2d");

let count = 0;

let snake = {

    x: 100,
    y: 100,

    dx: tileSize,
    dy: 0,

    cells: [],


    maxCells: 4,

}

let apple = {


    x: 320,
    y: 320,



}


function getRandomInt(min, max) {

    return Math.floor(Math.random() * (max - min)) + min;

}

function loop(){

    requestAnimationFrame(loop);

    if (++count < 4) {

        return;

    }

    count = 0;

    context.clearRect(0,0, canvas.width, canvas.height);
    
    snake.x += snake.dx;
    snake.y += snake.dy;

    snake.x = Math.round(snake.x/tileSize) * tileSize
    snake.y = Math.round(snake.y/tileSize) * tileSize

    if (snake.x < 0) {

        snake.x = canvas.width - tileSize;

    }
    else if (snake.x >= canvas.width) {

        snake.x = 0;

    }

    if (snake.y < 0) {

        snake.y = canvas.height - tileSize;

    }

    else if( snake.y >= canvas.height) {

        snake.y = 0;

    }

    snake.cells.unshift({x : snake.x, y: snake.y});

    
    if( snake.cells.length > snake.maxCells) {

    snake.cells.pop();

    }

    context.fillStyle = "blue";

    context.fillRect(apple.x, apple.y, tileSize, tileSize);


    context.fillStyle = "green";
    snake.cells.forEach((cell, index) => {

        context.fillRect(cell.x, cell.y, tileSize -1, tileSize -1);

        if(cell.x == apple.x && cell.y == apple.y) {

            snake.maxCells++;

            valScore += 10;
            score.innerHTML = valScore;
            apple.x = getRandomInt(0, columnCount) * tileSize;
            apple.y = getRandomInt(0, rowCount) * tileSize;
        }

        for (let i = index + 1; i < snake.cells.length; i++) {

            if(cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {

                snake.x = 100;
                snake.y = 100;

                snake.cells = [];
                snake.maxCells = 4;
                snake.dx = tileSize;
                snake.dy = 0;
                
                apple.x = getRandomInt(0, columnCount) * tileSize;
                apple.y = getRandomInt(0, rowCount) * tileSize;

            }

        }
    });

}

document.addEventListener("keydown", (e) => {

    // left arrow key
    if(e.which === 37 && snake.dx === 0) {

        snake.dx = -tileSize;

        snake.dy = 0;
    }

    // up arrow key
    else if(e.which === 38 && snake.dy === 0) {

       snake.dx = 0;
       snake.dy = -tileSize;

    }

    // right arrow
    else if(e.which === 39 && snake.dx === 0) {

        snake.dx = tileSize
        snake.dy = 0
 
     }

     // down arrow key
     else if(e.which === 40 && snake.dy === 0) {

        snake.dx = 0;
        snake.dy = tileSize;
 
     }

})

requestAnimationFrame(loop);