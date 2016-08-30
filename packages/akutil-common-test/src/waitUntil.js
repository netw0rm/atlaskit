/*
    waitUntil is a testHelper to wait an arbitrary amount of time until a condition is met. It takes
    in a function (the condition of when to keep running) and returns a promise.
    This is useful when you want to make changes to a component and then ensure that it has been
    rendered before performing any tests.
    Within tests this is safe as they will automatically fail after 2000ms of not responding.

    USAGE
    ```
    const elem = document.querySelector('.fixture').firstChild;
    // We put name our condition function so we can re-use it a couple of times
    const elemRenderedImgTag = () => (elem[symbols.shadowRoot].querySelector('img') !== null);

    // check that no image is rendered before we start
    expect(elemRenderedImgTag()).to.be.false;

    // set a property to make the image be rendered
    elem.showImage = true;

    // now wait until we can see the image rendered
    waitUntil(elemRenderedImgTag).then(() => (expect(elemRenderedImgTag()).to.be.true));

    // alternatively, we might want to do more things in the .then call, even chain more waitUntils

    waitUntil(elemRenderedImgTag).then(() => {
      expect(elemRenderedImgTag()).to.be.true;
      doSomeMoreStuff(elem);
      return waitUntil(someOtherConditionIsTrue());
    }).then(() => {
      // Now we can do more stuff in here!
    });
    ```
*/

function waitUntil(fn) {
  return new Promise((resolve, reject) => {
    try {
      ((function testFn() {
        if (fn()) {
          resolve();
          return;
        }
        setTimeout(testFn, 1);
      })());
    } catch (e) {
      reject(e);
      return;
    }
  });
}

export default waitUntil;
