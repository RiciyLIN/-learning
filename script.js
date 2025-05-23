const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const size = 100;
let board, currentPlayer, gameOver;

function initGame() {
  board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ];
  currentPlayer = "○";
  gameOver = false;
  document.getElementById("message").textContent = `${currentPlayer} の番です`;
  drawBoard();
}

function drawBoard() {
  ctx.clearRect(0, 0, 300, 300);
  ctx.beginPath();
  ctx.moveTo(size, 0);
  ctx.lineTo(size, 300);
  ctx.moveTo(size * 2, 0);
  ctx.lineTo(size * 2, 300);
  ctx.moveTo(0, size);
  ctx.lineTo(300, size);
  ctx.moveTo(0, size * 2);
  ctx.lineTo(300, size * 2);
  ctx.strokeStyle = "#444";
  ctx.lineWidth = 3;
  ctx.stroke();

  for (let y = 0; y < 3; y++) {
    for (let x = 0; x < 3; x++) {
      const cell = board[y][x];
      const cx = x * size + size / 2;
      const cy = y * size + size / 2;
      if (cell === "○") {
        ctx.beginPath();
        ctx.arc(cx, cy, 30, 0, Math.PI * 2);
        ctx.strokeStyle = "#e63946"; // 红色 ○
        ctx.lineWidth = 5;
        ctx.stroke();
      } else if (cell === "×") {
        ctx.strokeStyle = "#1d3557"; // 蓝色 ×
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(cx - 25, cy - 25);
        ctx.lineTo(cx + 25, cy + 25);
        ctx.moveTo(cx + 25, cy - 25);
        ctx.lineTo(cx - 25, cy + 25);
        ctx.stroke();
      }
    }
  }
}

function handleClick(e) {
  if (gameOver) return;
  const rect = canvas.getBoundingClientRect();
  const x = Math.floor((e.clientX - rect.left) / size);
  const y = Math.floor((e.clientY - rect.top) / size);

  if (board[y][x] === "") {
    board[y][x] = currentPlayer;
    drawBoard();

    if (checkWinner(currentPlayer)) {
      document.getElementById("message").textContent = `${currentPlayer} の勝ち！`;
      gameOver = true;
    } else if (isDraw()) {
      document.getElementById("message").textContent = "引き分け！";
      gameOver = true;
    } else {
      currentPlayer = currentPlayer === "○" ? "×" : "○";
      document.getElementById("message").textContent = `${currentPlayer} の番です`;
    }
  }
}

function checkWinner(player) {
  for (let i = 0; i < 3; i++) {
    if (board[i][0] === player && board[i][1] === player && board[i][2] === player) return true;
    if (board[0][i] === player && board[1][i] === player && board[2][i] === player) return true;
  }
  if (board[0][0] === player && board[1][1] === player && board[2][2] === player) return true;
  if (board[0][2] === player && board[1][1] === player && board[2][0] === player) return true;
  return false;
}

function isDraw() {
  return board.flat().every(cell => cell !== "");
}

canvas.addEventListener("click", handleClick);
document.getElementById("restart").addEventListener("click", initGame);

// 初始化
initGame();
