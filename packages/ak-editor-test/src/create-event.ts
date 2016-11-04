/**
 * Test if we could use `new Event()` to create an event
 *
 * In IE, doing `new Event()` would throw an error.
 */
const supportsEvent = ((TheEvent) => {
  if (TheEvent) {
    try {
      new TheEvent('emit-init');
    } catch (e) {
      return false;
    }
  }
  return true;
})(Event);

interface Options {
  bubbles?: boolean;
  cancelable?: boolean;
  composed?: boolean;
}

/**
 * Build an event object in a cross-browser manner
 *
 * Usage:
 *    const event = createEvent('paste', options);
 */
export default (name: string, options: Options = {}) => {
  let event;

  if (options.bubbles === undefined) {
    options.bubbles = true;
  }
  if (options.cancelable === undefined) {
    options.cancelable = true;
  }
  if (options.composed === undefined) {
    options.composed = true;
  }

  if (supportsEvent) {
    event = new Event(name, options) as any;
  } else {
    event = document.createEvent('Event');
    event.initEvent(name, options.bubbles, options.cancelable);
  }

  return event;
}
