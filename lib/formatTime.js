// @flow

function pad(number) {
  return String(number).length > 1 ? number : `0${number}`;
}

export function timeToString(time: number) {
  const minutes = Math.floor((time / 60) % 60);
  const seconds = time - 60 * minutes;
  return `${pad(minutes)}:${pad(seconds)}`;
}
