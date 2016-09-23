import 'custom-event-polyfill';
import keyCode from 'keycode';

function sendKeyEvent(key, target, type) {
  const event = new CustomEvent(type, {
    bubbles: true,
    cancelable: true,
  });
  event.keyCode = keyCode(key);
  (target || document).dispatchEvent(event);
}

/**
 * Simulate a user's keydown input
 * @param key – the key to press, will be passed to keycode
 * @param target – a DOM element to trigger the event on. If undefined, triggered on the document.
 */
export function keydown(key, target) {
  sendKeyEvent(key, target, 'keydown');
}

/**
 * Simulate a user's keyup input
 * @param key – the key to press, will be passed to keycode
 * @param target – a DOM element to trigger the event on. If undefined, triggered on the document.
 */
export function keyup(key, target) {
  sendKeyEvent(key, target, 'keyup');
}
