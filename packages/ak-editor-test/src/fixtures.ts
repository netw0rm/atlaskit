/**
 * A helper for creating fixtures in tests.
 *
 * A function is returned that when called in the context of a test, will return
 * a reference to an element in the DOM. Clean-up of the element is handled
 * automatically.
 *
 * @example @js const fixture = fixtures();
 * it('should have a fixture', () => {
 *   expect(fixture().tagName).to.equal('DIV');
 * });
 * @returns {() => HTMLElement}
 */
export default () => {
  let fixture = document.createElement('div');

  beforeEach(() => {
    fixture = document.createElement('div');
    document.body.appendChild(fixture);
  });

  afterEach(() => {
    if (fixture.parentNode !== document.body) {
      throw new Error('fixture.parentNode changed');
    }
    document.body.removeChild(fixture);
  });

  return () => fixture;
};
