/**
 * A helper for determining if any props have changed in an updated() call.
 * @returns true if there are any strict equality differences
 */
export default (elem, prevProps) =>
  Object.keys(prevProps).some(name => prevProps[name] !== elem[name]);
