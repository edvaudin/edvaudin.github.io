var slider = 700;
var output;



window.onload = function () {
    var he = document.getElementById("anim");
    he.classList.remove("anim");
    var CANVAS = document.getElementsByClassName("canvas")[0];
    CANVAS.style.border = '5px solid white'; 
    CANVAS.style.backgroundColor = "black";
    let gameRunning = -1;
    slider = document.getElementById("difficulty").value;
    output = document.getElementById("output");
}


function buttonHandler() {
    gameRunning = 1;
    playerReset();
    player.score = 0;
    updateScore();
    update();
    document.getElementById("gameOver").style.display = "none";
}

// Get canvas and set context
const canvas = document.getElementsByClassName("canvas")[0];
const ctx = canvas.getContext("2d");


// Apply context scale
ctx.scale(20, 20);



function arenaSweep() {
    let rowCount = 1;
    outer: for (var y = arena.length - 1; y > 0; y--) {
        for (var x = 0; x < arena[y].length; x++) {
            if (arena[y][x] === 0) {
                continue outer;
            }
        }
        const row = arena.splice(y, 1)[0].fill(0);
        arena.unshift(row);
        y++;

        player.score += rowCount * 10;
        rowCount *= 2;
    }
}

function collide(arena, player) {
    const m = player.matrix;
    const o = player.pos;
    for (let y = 0; y < m.length; y++) {
        for (let x = 0; x < m[y].length; x++) {
            if (m[y][x] !== 0 &&
                (arena[y + o.y] &&
                    arena[y + o.y][x + o.x]) !== 0) {

                return true;

            }
        }
    }
    return false;
}

// Creates playable matrix surface in canvas
function createMatrix(w, h) {
    const matrix = [];
    // Whilst height is not fasley (!= 0) push a new row of 0s into the matrix
    while (h--) {
        matrix.push(new Array(w).fill(0));
    }
    return matrix;
}

// Tetrmino matrix profiles
function createPiece(type) {
    if (type === 'T') {
        return [
            [0, 0, 0],
            [1, 1, 1],
            [0, 1, 0],
        ];
    } else if (type === 'O') {
        return [
            [2, 2],
            [2, 2],
        ];
    } else if (type === 'L') {
        return [
            [0, 3, 0],
            [0, 3, 0],
            [0, 3, 3],
        ];
    } else if (type === 'J') {
        return [
            [0, 4, 0],
            [0, 4, 0],
            [4, 4, 0],
        ];
    } else if (type === 'I') {
        return [
            [0, 5, 0, 0],
            [0, 5, 0, 0],
            [0, 5, 0, 0],
            [0, 5, 0, 0],
        ];
    } else if (type === 'S') {
        return [
            [0, 6, 6],
            [6, 6, 0],
            [0, 0, 0],
        ];
    } else if (type === 'Z') {
        return [
            [7, 7, 0],
            [0, 7, 7],
            [0, 0, 0],
        ];
    }
}

// Draws tetromino 
function drawMatrix(matrix, offset) {
    // Scans matrix rows and columns, if it spots 1s (tetromino in matrix) it fills a rectangle of that space
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                ctx.fillStyle = colors[value];
                ctx.fillRect(x + offset.x, y + offset.y, 1, 1);
            }
        });
    });
}

// Draws black canvas, then draws matrix (first instance the size of arena from origin)(second instance)
function draw() {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawMatrix(arena, { x: 0, y: 0 });
    drawMatrix(player.matrix, player.pos);
}

// Draws the collided tetromino onto the arena
function merge(arena, player) {
    player.matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                arena[y + player.pos.y][x + player.pos.x] = value;
            }
        });
    });
}

// Drops tetromino incrementally unless it will collide in which case tetromino is merged with arena then playerReset()
function playerDrop() {
    player.pos.y++;
    if (collide(arena, player)) {
        player.pos.y--;
        merge(arena, player);
        playerReset();
        arenaSweep();
        updateScore();
    }
    dropCounter = 0;
}

// Moves tetromino by x increment in given direction
function playerMove(dir) {
    player.pos.x += dir;
    if (collide(arena, player)) {
        player.pos.x -= dir;
    }
}

/* 
Assigns new tetromino profile at random, puts it at the top-middle of the arena (y=0 x=arena[0].length / 2 | 0)
If it is going to collide with another fresh tetromino, reset the top row of arena
*/
function playerReset() {
    const pieces = 'ILJOTSZ';
    player.matrix = createPiece(pieces[pieces.length * Math.random() | 0]);
    player.pos.y = 0;
    player.pos.x = (arena[0].length / 2 | 0) -
        (player.matrix[0].length / 2 | 0);
    if (collide(arena, player)) {
        document.getElementById("gameOver").style.display = "block";
        gameRunning = 0;
        arena.forEach(row => row.fill(0));
    }
}

// Allows player to call rotate and checks that the rotate will not go out of the arena
function playerRotate(dir) {
    const pos = player.pos.x;
    let offset = 1;
    rotate(player.matrix, dir);
    while (collide(arena, player)) {
        player.pos.x += offset;
        offset = -(offset + (offset > 0 ? 1 : -1));
        if (offset > player.matrix[0].length) {
            rotate(player.matrix, -dir);
            player.pos.x = pos;
            return;
        }
    }
}

// Transposes rotated matrix
function rotate(matrix, dir) {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < y; x++) {
            [
                matrix[x][y],
                matrix[y][x],
            ] = [
                    matrix[y][x],
                    matrix[x][y],
                ];
        }
    }
    if (dir > 0) {
        matrix.forEach(row => row.reverse());
    } else {
        matrix.reverse();
    }
}

let dropCounter = 0;
let dropInterval = slider;
let lastTime = 0;

function updateScore() {
    document.getElementById("score").innerText = player.score;
}

function update(time = 0) {
    if (gameRunning != 0) {
        const deltaTime = time - lastTime;
        lastTime = time;
        dropCounter += deltaTime;
        // If time passed goes over set interval: player.pos.y++ (as set in playerDrop())
        if (dropCounter > dropInterval) {
            playerDrop();
        }
        draw();
        requestAnimationFrame(update);
    }

}

const colors = [
    null,
    "#FF0D72",
    "#0DC2FF",
    "#0DFF72",
    "#F538FF",
    "#FF8E0D",
    "#FFE138",
    "#3877FF",
];

const arena = createMatrix(12, 20);

const player = {
    pos: { x: 0, y: 0 },
    matrix: createPiece('T'),
    score: 0,
}

// Listens to keypresses
document.addEventListener("keydown", event => {
    if (event.keyCode === 37) {
        playerMove(-1);
    } else if (event.keyCode === 39) {
        playerMove(1);
    } else if (event.keyCode === 40) {
        playerDrop();
    } else if (event.keyCode === 38) {
        playerRotate(-1);
    }
});


function modSpeed(){
    dropInterval = document.getElementById("difficulty").value;
    output.innerHTML = dropInterval;
    document.getElementsByClassName("canvas")[0].focus();
}



