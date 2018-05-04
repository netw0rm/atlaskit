const DEFAULT_TIMEOUT = 500;
const waitFor = (callback, duration = DEFAULT_TIMEOUT) => {
  const expire = Date.now() + duration;
  if (typeof expire !== 'number') {
    throw new Error('Expire time was malformed.');
  }
  const FREQUENTLY = 5;

  return new Promise((resolve, reject) => {
    const intervalId = setInterval(() => {
      let error = null;
      try {
        callback();
      } catch (e) {
        error = e;
      }
      if (!error) {
        clearInterval(intervalId);
        resolve();
      } else if (Date.now() > expire) {
        clearInterval(intervalId);
        reject(error);
      }
    }, FREQUENTLY);
  });
};
export default waitFor;
