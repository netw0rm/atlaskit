
function promiseAny(promises) {
  if (promises.length === 0) { throw new RangeError('promiseAny(...): should pass at least one promise!'); }

  promises.forEach(p => {
    if (!p || !p.then) {
      throw new TypeError('promiseAny(...): all args should be promises!');
    }
  });

  const length = promises.length;
  let rejectionCount = 0;
  return new Promise((resolve, reject) => {
    promises.forEach(p => p.then(resolve, err => {
      rejectionCount++;
      if (rejectionCount >= length) reject(err);
    }));
  });
}

module.exports = {
  promiseAny,
};
