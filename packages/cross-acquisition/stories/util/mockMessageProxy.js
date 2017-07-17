/**
  * Simple Proxy to silence "[React Intl] Missing message" in proxy.
  *
  * Return proxy object will return a string which equals the requested property/target.
  */
export default new Proxy({}, { get: (target, name) => name });
