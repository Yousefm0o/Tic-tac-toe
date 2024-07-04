let isInGame = false;
let Status = document.getElementById("status");
let board = document.getElementById("board");
let boardCode = [
    0, 0, 0,
    0, 0, 0,
    0, 0, 0
]
let unplayed = 0;
let playerO = 1;
let playerX = 2;
let playerOscore = 0;
let playerXscore = 0;
let scoreO = document.querySelector("#player-o span");
let scoreX = document.querySelector("#player-x span");
let currentPlayer = 1;
let winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

statusprag = [
    "Press new game to start...",
    "It's Player-O's turn", 
    "It's Player-X's turn",
    "Player-O have won",
    "Player-X have won",
    "New Round...",
    "No one has won this round"
]
Status.innerText = statusprag[0] 
scoreO.innerText = playerOscore;
scoreX.innerText = playerXscore;

function isWinner() {
    for (let i = 0;i < winningConditions.length; i++) {
        let currentCondition = winningConditions[i];
        let index1 = currentCondition[0];
        let index2 = currentCondition[1];
        let index3 = currentCondition[2];
        if (boardCode[index1] == boardCode[index2] && boardCode[index1] == boardCode[index3] && boardCode[index1] != 0) {
            return true;
        }
    }
    return false;
}

function isDraw() {
    for (let i = 0;i < boardCode.length; i++) {
        if (boardCode[i] == 0) {
            return false
        }
    }
    return true;
}

for (let i = 0; i < board.children.length; i++) {
    let X = document.createElement("div");
    X.setAttribute("class", "X");
    let span1 = document.createElement("span");
    let span2 = document.createElement("span");
    X.append(span1, span2);
    let O = document.createElement("div");
    O.setAttribute("class", "O");

    board.children[i].onclick = function (e) {
            if (isInGame) {
                if (currentPlayer == 1 && isInGame) {
                    if (!board.children[i].contains(O) && boardCode[i] == 0 && isInGame) {
                        board.children[i].appendChild(O);
                        boardCode[i] = playerO;
                        currentPlayer = 2;
                        Status.innerText = statusprag[2]
                    }
                }
                if (currentPlayer == 2 && isInGame) {
                    if (!board.children[i].contains(X) && boardCode[i] == 0 && isInGame) {
                        board.children[i].appendChild(X);
                        boardCode[i] = playerX;
                        currentPlayer = 1;
                        Status.innerText = statusprag[1]
                    }
                }
            }
            if (isWinner() && isInGame) {
                isInGame = false;
                if (currentPlayer == 2) {
                    scoreO.innerText = ++playerOscore;
                    Status.innerText = statusprag[3];
                } else if (currentPlayer == 1) {
                    scoreX.innerText = ++playerXscore;
                    Status.innerText = statusprag[4];
                }
                setTimeout(function () {Status.innerText = statusprag[5]}, 1000)
                setTimeout(newRound, 2000);
            } else if (isDraw() && isInGame) {
                isInGame = false;
                Status.innerText = statusprag[6]
                setTimeout(newRound, 2000);
            }
    }
}

function newRound() {
    boardCode = [
        0, 0, 0,
        0, 0, 0,
        0, 0, 0
    ]
    for (let i = 0; i < board.children.length; i++) {
            board.children[i].innerHTML = ""   
    }
    isInGame = true;
    currentPlayer = 1;
    Status.innerText = statusprag[1];
}

function newGame() {
    newRound()
    playerOscore = 0;
    playerXscore = 0;
    scoreO.innerText = playerOscore;
    scoreX.innerText = playerXscore;
}






