import { tagName, themeHandlers, themeNameFromNode } from '../src/themes';

describe('ak-theme, { themes }', () => {
  it('tagName', () => {
    expect(tagName(document.createElement('x-a1b2c3d4-a1b2c3d4'))).to.equal('x-a1b2c3d4-a1b2c3d4');
    expect(tagName(document.createElement('x-a1b2c3d4-a1b2c3d4'))).to.equal('x-a1b2c3d4-a1b2c3d4');
  });

  it('themeHandlers', () => {
    // If we test WeakMap directly, this breaks in polyfilled browsers.
    expect(typeof themeHandlers).to.equal('object');
  });

  it('themeNameFromNode', () => {
    expect(themeNameFromNode(document.createElement('x-a1b2c3d4-a1b2c3d4')))
      .to.equal('x-a1b2c3d4-a1b2c3d4');
    expect(themeNameFromNode(document.createElement('x-a1b2c3d4-a1b2c3d4')))
      .to.equal('x-a1b2c3d4-a1b2c3d4');
  });
});
