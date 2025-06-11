// match.js
let timer = 60; // 60 seconds
let score = { blue: 0, red: 0 };
let interval;

export function startMatch() {
  interval = setInterval(() => {
    timer--;
    document.getElementById('time').textContent = `Time: ${timer}`;
    if (timer <= 0) endMatch();
  }, 1000);
}

export function addScore(team) {
  score[team]++;
  updateScoreDisplay();
}

function updateScoreDisplay() {
  document.getElementById('score').textContent = `Blue: ${score.blue} | Red: ${score.red}`;
}

function endMatch() {
  clearInterval(interval);
  let winner = score.blue > score.red ? 'Blue' : 'Red';
  alert(`Match over! Winner: ${winner}`);
}
