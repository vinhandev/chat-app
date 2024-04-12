export function formatTimeForPreview(time: number) {
  const date = new Date(time);
  const hours = addZero(date.getHours());
  const minutes = addZero(date.getMinutes());
  return `${hours}:${minutes}`;
}

function addZero(time: number) {
  return time < 10 ? `0${time}` : time;
}
