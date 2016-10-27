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

interface OptsType {
  bubbles?: boolean;
  cancelable?: boolean;
  composed?: boolean;
}

export default (name: string, opts: OptsType = {}) => {
  let event;

  if (opts.bubbles === undefined) {
    opts.bubbles = true;
  }
  if (opts.cancelable === undefined) {
    opts.cancelable = true;
  }
  if (opts.composed === undefined) {
    opts.composed = true;
  }

  if (supportsEvent) {
    event = new Event(name, opts) as any;
  } else {
    event = document.createEvent('Event');
    event.initEvent(name, opts.bubbles, opts.cancelable);
  }

  return event;
}
