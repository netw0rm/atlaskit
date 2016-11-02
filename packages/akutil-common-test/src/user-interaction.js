import 'custom-event-polyfill';
import keyCode from 'keycode';

function sendKeyEvent(key, { modifiers, target }, type) {
  const event = new CustomEvent(type, {
    bubbles: true,
    cancelable: true,
  });
  event.keyCode = keyCode(key);
  if (modifiers) {
    event.metaKey = modifiers.metaKey;
    event.altKey = modifiers.altKey;
    event.shiftKey = modifiers.shiftKey;
    event.ctrlKey = modifiers.ctrlKey;
  }
  (target || document).dispatchEvent(event);
}

/**
 * Simulate a user's keydown input
 * @param key – the key to press, will be passed to keycode
 * @param options {Object} – options for the event.
 * @param options.target – a DOM element to trigger the event on. Default:triggered on the document.
 * @param options.modifiers {Object} – modifiers for the event (see https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent)
 * @param options.modifiers.altKey {Boolean}
 * @param options.modifiers.metaKey {Boolean}
 * @param options.modifiers.shiftKey {Boolean}
 * @param options.modifiers.ctrlKey {Boolean}
 * */
export function keydown(key, options) {
  sendKeyEvent(key, options || {}, 'keydown');
}

/**
 * Simulate a user's keyup input
 * @param key – the key to press, will be passed to keycode
 * @param options {Object} – options for the event.
 * @param options.target – a DOM element to trigger the event on. Default:triggered on the document.
 * @param options.modifiers {Object} – modifiers for the event (see https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent)
 * @param options.modifiers.altKey {Boolean}
 * @param options.modifiers.metaKey {Boolean}
 * @param options.modifiers.shiftKey {Boolean}
 * @param options.modifiers.ctrlKey {Boolean}
 */
export function keyup(key, options) {
  sendKeyEvent(key, options || {}, 'keyup');
}

/**
 * Simulate a user's keypress input
 * @param key – the key to press, will be passed to keycode
 * @param options {Object} – options for the event.
 * @param options.target – a DOM element to trigger the event on. Default:triggered on the document.
 * @param options.modifiers {Object} – modifiers for the event (see https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent)
 * @param options.modifiers.altKey {Boolean}
 * @param options.modifiers.metaKey {Boolean}
 * @param options.modifiers.shiftKey {Boolean}
 * @param options.modifiers.ctrlKey {Boolean}
 */
export function keypress(key, options) {
  sendKeyEvent(key, options || {}, 'keypress');
}
