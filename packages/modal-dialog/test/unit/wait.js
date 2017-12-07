const DISPLAY_NAME = 'waitForElement';

describe('wait-for-element', () => {
  it('wait', () => {
    const val = 1;
    expect(val).toEqual(1);
  });
});

const waitForElement = (selector, maxTime = 15000, interval = 10) => rootComponent => {
  // Check correct usage
  if (!selector) {
    return Promise.reject(new Error(`No selector specified in ${DISPLAY_NAME}.`));
  }
  if (!rootComponent) {
    return Promise.reject(new Error(`No root component specified in ${DISPLAY_NAME}.`));
  }
  if (!rootComponent.length) {
    return Promise.reject(new Error(`Specified root component in ${DISPLAY_NAME} not found.`));
  }

  // Race component search against maxTime
  return new Promise((resolve, reject) => {
    let remainingTime = maxTime;

    const intervalId = setInterval(() => { // eslint-disable-line
      // reject with error when timeout
      if (remainingTime < 0) {
        clearInterval(intervalId);
        const name = selector.displayName || selector;
        return reject(new Error(`Expected to find "${name}" within ${maxTime}ms, but it was never found.`));
      }

      // return the root component when the selector is found
      const targetComponent = rootComponent.find(selector);
      if (targetComponent.length) {
        clearInterval(intervalId);
        return resolve(rootComponent);
      }

      // decrement remaining time
      remainingTime -= interval;
    }, interval);
  });
};

export default waitForElement;
