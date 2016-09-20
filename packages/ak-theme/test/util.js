import { tagName, themeNameFromNode } from '../src/util';

describe('ak-theme, { themes }', () => {
  it('tagName', () => {
    // We're testing exact tag names at the moment. However, once
    // https://github.com/skatejs/skatejs/issues/769 is implemented we should change the expected
    // tagName to be the non-unique name of a Skate component.
    expect(tagName(document.createElement('x-a1b2c3d4-a1b2c3d4'))).to.equal('x-a1b2c3d4-a1b2c3d4');
    expect(tagName(document.createElement('x-a1b2c3d4-a1b2c3d4'))).to.equal('x-a1b2c3d4-a1b2c3d4');
  });

  it('themeNameFromNode', () => {
    expect(themeNameFromNode(document.createElement('x-a1b2c3d4-a1b2c3d4')))
      .to.equal('x-a1b2c3d4-a1b2c3d4');
    expect(themeNameFromNode(document.createElement('x-a1b2c3d4-a1b2c3d4')))
      .to.equal('x-a1b2c3d4-a1b2c3d4');
  });
});
