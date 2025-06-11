// room.js
export function generateRoomCode() {
  const code = Math.random().toString(36).substr(2, 6).toUpperCase();
  localStorage.setItem('roomCode', code);
  return code;
}

export function getRoomCode() {
  return localStorage.getItem('roomCode') || 'None';
}
