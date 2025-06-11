import { unlockedWeapons } from './unlockedWeapons.js';
import { weaponKits } from './weapons.js';

const weaponList = document.getElementById('weapon-list');

unlockedWeapons.forEach(weaponId => {
  const weapon = weaponKits.find(w => w.id === weaponId);
  if (!weapon) return;

  const li = document.createElement('li');
  li.textContent = weapon.name;
  li.title = weapon.id;

  li.onclick = () => {
    alert(`You selected the weapon: ${weapon.name}`);
  };

  weaponList.appendChild(li);
});
