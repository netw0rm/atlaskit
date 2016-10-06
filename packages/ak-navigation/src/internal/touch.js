import resizerFactory from './resizer';

export default function addTouchHandlers(navigation) {
  const resizer = resizerFactory(navigation);
  navigation.addEventListener('touchstart', (event) => {
    resizer.start({
      screenX: event.targetTouches[0].screenX,
    });
  });
  navigation.addEventListener('touchmove', (event) => {
    resizer.resize({
      screenX: event.targetTouches[0].screenX,
    });
  });
  navigation.addEventListener('touchend', () => {
    resizer.end();
  });
}
