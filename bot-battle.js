import { randInt, randomChoice } from './utils.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const TILE_SIZE = 16;
const ROWS = canvas.height / TILE_SIZE;
const COLS = canvas.width / TILE_SIZE;

const turf = [];

for (let r = 0; r < ROWS; r++) {
  turf[r] = [];
  for (let c = 0; c < COLS; c++) {
    turf[r][c] = 0;
  }
}

const player = {
  x: Math.floor(COLS / 2),
  y: Math.floor(ROWS / 2),
  color: '#00f',
};

const bots = [
  { x: 3, y: 3, color: '#f00', dir: null, moveCooldown: 0 },
  { x: COLS - 4, y: ROWS - 4, color: '#0f0', dir: null, moveCooldown: 0 },
];

const keys = {};
window.addEventListener('keydown', e => {
  keys[e.key.toLowerCase()] = true;
});
window.addEventListener('keyup', e => {
  keys[e.key.toLowerCase()] = false;
});

function movePlayer() {
  let newX = player.x;
  let newY = player.y;

  if (keys['arrowup'] || keys['w']) newY--;
  if (keys['arrowdown'] || keys['s']) newY++;
  if (keys['arrowleft'] || keys['a']) newX--;
  if (keys['arrowright'] || keys['d']) newX++;

  if (newX >= 0 && newX < COLS) player.x = newX;
  if (newY >= 0 && newY < ROWS) player.y = newY;

  turf[player.y][player.x] = 1;
}

function moveBots() {
  bots.forEach(bot => {
    if (bot.moveCooldown > 0) {
      bot.moveCooldown--;
      return;
    }

    const directions = [
      { dx: 0, dy: -1 },
      { dx: 0, dy: 1 },
      { dx: -1, dy: 0 },
      { dx: 1, dy: 0 },
    ];
    const move = randomChoice(directions);

    const newX = bot.x + move.dx;
    const newY = bot.y + move.dy;

    if (newX >= 0 && newX < COLS && newY >= 0 && newY < ROWS) {
      bot.x = newX;
      bot.y = newY;
      turf[newY][newX] = 2;
    }

    bot.moveCooldown = randInt(10, 30);
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (turf[r][c] === 1) {
        ctx.fillStyle = '#00a';
        ctx.fillRect(c * TILE_SIZE, r * TILE_SIZE, TILE_SIZE, TILE_SIZE);
      } else if (turf[r][c] === 2) {
        ctx.fillStyle = '#a00';
        ctx.fillRect(c * TILE_SIZE, r * TILE_SIZE, TILE_SIZE, TILE_SIZE);
      }
    }
  }

  ctx.fillStyle = player.color;
  ctx.fillRect(player.x * TILE_SIZE, player.y * TILE_SIZE, TILE_SIZE, TILE_SIZE);

  bots.forEach(bot => {
    ctx.fillStyle = bot.color;
    ctx.fillRect(bot.x * TILE_SIZE, bot.y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  });
}

function gameLoop() {
  movePlayer();
  moveBots();
  draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();
