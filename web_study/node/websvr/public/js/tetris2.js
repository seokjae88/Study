// DOM
const playground = document.querySelector(".tb2 > .playground > ul");
const playground2 = document.querySelector(".tb3 > .playground > ul");
const scoreDisplay = document.querySelector(".tb2 > .score");
const scoreDisplay2 = document.querySelector(".tb3 > .score");
const gameText = document.querySelector(".game-text");
const restartButton = document.querySelector(".game-text > button")

// Setting
const GAME_ROWS = 20;
const GAME_COLS = 10;

// variables
let score = 0;
let duration = 500;
let downInterval;
let tempMovingItem;

var socket = io();

const BLOCKS = {
    tree: [
        [[1, 0], [0, 1], [1, 1], [2, 1]],
        [[1, 0], [1, 1], [1, 2], [2, 1]],
        [[0, 1], [1, 1], [2, 1], [1, 2]],
        [[1, 0], [1, 1], [1, 2], [0, 1]],
    ],
    square: [
        [[0, 0], [0, 1], [1, 0], [1, 1]],
        [[0, 0], [0, 1], [1, 0], [1, 1]],
        [[0, 0], [0, 1], [1, 0], [1, 1]],
        [[0, 0], [0, 1], [1, 0], [1, 1]],
    ],
    bar: [
        [[1, 0], [2, 0], [3, 0], [4, 0]],
        [[2, -1], [2, 0], [2, 1], [2, 2]],
        [[1, 0], [2, 0], [3, 0], [4, 0]],
        [[2, -1], [2, 0], [2, 1], [2, 2]],
    ],
    zeeLeft: [
        [[1, 0], [1, 1], [0, 1], [0, 2]],
        [[0, 1], [1, 1], [1, 2], [2, 2]],
        [[1, 0], [1, 1], [0, 1], [0, 2]],
        [[0, 1], [1, 1], [1, 2], [2, 2]],
    ],
    zeeRight: [
        [[1, 0], [1, 1], [2, 1], [2, 2]],
        [[0, 2], [1, 2], [1, 1], [2, 1]],
        [[1, 0], [1, 1], [2, 1], [2, 2]],
        [[0, 2], [1, 2], [1, 1], [2, 1]],
    ],
    elLeft: [
        [[0, 0], [1, 0], [1, 1], [1, 2]],
        [[0, 2], [0, 1], [1, 1], [2, 1]],
        [[1, 0], [1, 1], [1, 2], [2, 2]],
        [[0, 1], [1, 1], [2, 1], [2, 0]],
    ],
    elRight: [
        [[2, 0], [1, 0], [1, 1], [1, 2]],
        [[0, 1], [1, 1], [2, 1], [2, 2]],
        [[1, 0], [1, 1], [1, 2], [0, 2]],
        [[0, 0], [0, 1], [1, 1], [2, 1]],
    ]
}
const movingItem = {
    type: "",
    direction: 1,
    top: 0,
    left: 3,
    moveType: "",
}

// functions
function init() {
    tempMovingItem = { ...movingItem }; // 값만 복사

    for (let i = 0; i < GAME_ROWS; i++) {
        prependNewLine(playground);
        prependNewLine(playground2);
    }

    generateNewBlock();
}
function prependNewLine(_playground) {
    const li = document.createElement("li");
    const ul = document.createElement("ul");
    for (let j = 0; j < 10; j++) {
        const matrix = document.createElement("li");
        ul.prepend(matrix);
    }
    li.prepend(ul);
    _playground.prepend(li);
}
function renderBlocks(moveType = "") {
    tempMovingItem.moveType = moveType;
    socket.emit('moving', tempMovingItem);
    const { type, direction, top, left } = tempMovingItem;
    const movingBlocks = document.querySelectorAll(".moving");
    movingBlocks.forEach(moving => {
        moving.classList.remove(type, "moving");
    })
    BLOCKS[type][direction].some(block => {
        const x = block[0] + left;
        const y = block[1] + top;
        const target = playground.childNodes[y] ? playground.childNodes[y].childNodes[0].childNodes[x] : null;
        const isAvailable = checkEmpty(target);
        if (isAvailable) {
            target.classList.add(type, "moving");
        } else {
            tempMovingItem = { ...movingItem }
            if (moveType === 'retry') {
                socket.emit('gameover');
                clearInterval(downInterval);
                showGameoverText();
            }
            setTimeout(() => {
                renderBlocks('retry');
                if (moveType === "top") {
                    seizeBlock(playground);
                }
            }, 0)
            return true;
        }
    })

    movingItem.left = left;
    movingItem.top = top;
    movingItem.direction = direction;
}
function seizeBlock(_playground) {
    const movingBlocks = document.querySelectorAll(".moving");
    movingBlocks.forEach(moving => {
        moving.classList.remove("moving");
        moving.classList.add("seized");
    })
    checkMatch(_playground);
    generateNewBlock();
}
function checkMatch(_playground) {
    const childNodes = _playground.childNodes;
    childNodes.forEach(child => {
        let matched = true;
        child.children[0].childNodes.forEach(li => {
            if (!li.classList.contains("seized")) {
                matched = false;
            }
        })
        if (matched) {
            child.remove();
            prependNewLine(_playground);
            score++;
            scoreDisplay.innerText = score;
        }
    })
}
function generateNewBlock() {
    clearInterval(downInterval);
    downInterval = setInterval(() => {
        moveBlock('top', 1);
    }, duration)
    const blockArray = Object.entries(BLOCKS);
    const randomIndex = Math.floor(Math.random() * blockArray.length);
    movingItem.type = blockArray[randomIndex][0];
    movingItem.top = 0;
    movingItem.left = 3;
    movingItem.direction = 0;
    tempMovingItem = { ...movingItem };
    renderBlocks();
}
function checkEmpty(target) {
    if (!target || target.classList.contains("seized")) {
        return false;
    }
    return true;
}
function moveBlock(moveType, amount) {
    tempMovingItem[moveType] += amount;
    renderBlocks(moveType)
}
function changeDirection() {
    const direction = tempMovingItem.direction;
    direction === 3 ? tempMovingItem.direction = 0 : tempMovingItem.direction += 1;
    renderBlocks()
}
function dropBlock() {
    clearInterval(downInterval);
    downInterval = setInterval(() => {
        moveBlock("top", 1);
    }, 10)
}
function showGameoverText() {
    gameText.style.display = "flex";
}
// event handling
document.addEventListener("keydown", e => {
    switch (e.keyCode) {
        case 39: // Arrow Right
            moveBlock("left", 1);
            break;
        case 37: // Arrow Left
            moveBlock("left", -1);
            break;
        case 40: // Arrow Down
            moveBlock("top", 1);
            break;
        case 38: // Arrow Up
            changeDirection();
            break;
        case 32: // space
            dropBlock();
            break;
        default:
            break;
    }
})
restartButton.addEventListener("click", () => {
    playground.innerHTML = "";
    playground2.innerHTML = "";
    score = 0;
    scoreDisplay.innerText = score;
    gameText.style.display = "none";
    init();
})

socket.on('moving', (renderItem) => {
    const { type, direction, top, left } = renderItem;
    const movingBlocks = document.querySelectorAll(".moving2");
    movingBlocks.forEach(moving => {
        moving.classList.remove(type, "moving2");
    })
    BLOCKS[type][direction].some(block => {
        const x = block[0] + left;
        const y = block[1] + top;
        const target = playground2.childNodes[y] ? playground2.childNodes[y].childNodes[0].childNodes[x] : null;
        const isAvailable = checkEmpty(target);
        if (isAvailable) {
            target.classList.add(type, "moving2");
        } else {
            setTimeout(() => {
                if (renderItem.moveType === "top") {
                    const movingBlocks2 = document.querySelectorAll(".moving2");
                    movingBlocks2.forEach(moving => {
                        moving.classList.remove("moving2");
                        moving.classList.add("seized");
                    })
                    checkMatch(playground2);
                }
            }, 0)
            return true;
        }
    })
});
socket.on('seized', () => {
    const movingBlocks = document.querySelectorAll(".moving2");
    movingBlocks.forEach(moving => {
        moving.classList.remove("moving2");
        moving.classList.add("seized");
    })
    checkMatch(playground2);
});
socket.on('gameover', () => {
    console.log('gameover');
});

init();