import BigitRoll from './component/BigitRoll';
window.requestAnimationFrame = window.requestAnimationFrame || function raf(fn) {
  setTimeout(fn, 1000 / 60);
};
export default BigitRoll