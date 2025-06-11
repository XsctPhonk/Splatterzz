export function randInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function randomChoice(arr) {
  return arr[randInt(0, arr.length)];
}
