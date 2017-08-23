export default (predicate, waitTime = 1000) => new Promise((resolve, reject) => {
  const interval = setInterval(() => {
    if (predicate()) {
      clearInterval(interval);
      resolve();
    }
  }, 1);

  setTimeout(() => {
    if (!predicate()) {
      clearInterval(interval);
      reject(`waitUntil timed out after ${waitTime}ms on predicate: ${predicate}`);
    }
  }, waitTime);
});
