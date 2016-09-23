const swipeLeft = Symbol();
const swipeRight = Symbol();
const noSwipe = Symbol();
const touchThreshold = 20;

export default function getSwipeType(touchstart, touchend) {
  const startTouch = touchstart.targetTouches[0];
  const endTouch = touchend.changedTouches[0];
  const delta = startTouch.screenX - endTouch.screenX;
  if (delta > touchThreshold) {
    return swipeRight;
  } else if (delta < -touchThreshold) {
    return swipeLeft;
  }

  return noSwipe;
}

export { swipeLeft, swipeRight, noSwipe };
