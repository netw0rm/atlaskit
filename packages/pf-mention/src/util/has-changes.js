/**
 * A helper for determining if any props have changed in an updated() call.
 * @returns true if there are any strict equality differences
 */
export default (elem, prevProps) => {
  const keys = Object.keys(prevProps);
  return keys.length === 0 || // No keys in prevProps means for time props are set
    keys.some(name => prevProps[name] !== elem[name]);
};
