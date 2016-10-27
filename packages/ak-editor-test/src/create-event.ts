const supportsEvent = ((TheEvent) => {
  if (TheEvent) {
    try {
      new TheEvent('emit-init');
    } catch (e) {
      return undefined;
    }
  }
  return true;
})(Event);

interface Options {
  bubbles?: boolean;
  cancelable?: boolean;
  composed?: boolean;
}

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
