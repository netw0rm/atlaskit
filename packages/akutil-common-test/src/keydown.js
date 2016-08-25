import 'custom-event-polyfill';
import keyCode from 'keycode';

/**
 * Simulate a user's keydown input
 * @param key – the key to press, will be passed to keycode
 * @param target – a DOM element to trigger the event on. If undefined, triggered on the document.
 */
export default function keydown(key, target) {
  const event = new CustomEvent('keydown', {
    bubbles: true,
    cancelable: true,
  });
  event.keyCode = keyCode(key);
  (target || document).dispatchEvent(event);
}
