const swipeLeft = Symbol();
const swipeRight = Symbol();
const noSwipe = Symbol();

export default function getSwipeType(touchstart, touchend) {
  const startTouch = touchstart.targetTouches[0];
  const endTouch = touchend.changedTouches[0];
  const delta = startTouch.screenX - endTouch.screenX;
  if (delta > 20) {
    return swipeRight;
  } else if (delta < -20) {
    return swipeLeft;
  }

  return noSwipe;
}

export { swipeLeft, swipeRight, noSwipe };
