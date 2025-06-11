// hero-mode.js
import { heroMaps } from './hero-maps.js';

let currentLevel = 0;

export function loadHeroLevel(index) {
  const level = heroMaps[index];
  if (!level) return alert('Level not found');

  document.getElementById('hero-title').textContent = `Level: ${level.name}`;
  document.getElementById('hero-container').style.background = level.background;
}
