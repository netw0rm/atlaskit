/**
 * @description waitUntil is a testHelper to wait an arbitrary amount of time until a
 * condition is met.
 * It takes in a function (the condition of when to keep running) and returns a promise.
 * This is useful when you want to make changes to a component and then ensure that it has been
 * rendered before performing any tests.
 * Within tests this is safe as they will automatically fail after 2000ms of not responding.
 * @param fn function that must return true when it is time for the promise to continue
 * @example @js const elem = document.querySelector('.fixture').firstChild;
 *  // We put name our condition function so we can re-use it a couple of times
 *  const elemRenderedImgTag = () => (elem[symbols.shadowRoot].querySelector('img') !== null);
 *
 *  // check that no image is rendered before we start
 *  expect(elemRenderedImgTag()).to.be.false;
 *
 *  // set a property to make the image be rendered
 *  elem.showImage = true;
 *
 *  // now wait until we can see the image rendered
 *  waitUntil(elemRenderedImgTag).then(() => (expect(elemRenderedImgTag()).to.be.true));
 *
 *  // alternatively, we might want to do more things in the .then call, even chain more waitUntils
 *
 *  waitUntil(elemRenderedImgTag).then(() => {
 *    expect(elemRenderedImgTag()).to.be.true;
 *    doSomeMoreStuff(elem);
 *    return waitUntil(someOtherConditionIsTrue());
 *  }).then(() => {
 *    // Now we can do more stuff in here!
    });
 *
 *  // It is also possible to set a timeout and steps
 *  waitUntil(elemRenderedImgTag, 1000, 10).then(() => (expect(elemRenderedImgTag()).to.be.true));
 *  // it will do iterations every 10 ms and will reject after approximately 1s
 */
function waitUntil(fn, timeout = 2000, step = 1) {
  let iteration = 0;
  return new Promise((resolve, reject) => {
    try {
      ((function testFn() {
        if (fn()) {
          resolve();
          return;
        }
        // making sure that this will not fall into the endless loop
        iteration++;
        if (iteration * step <= timeout) {
          setTimeout(testFn, step);
        } else {
          reject('timeout');
          return;
        }
      })());
    } catch (e) {
      reject(e);
      return;
    }
  });
}

export default waitUntil;
