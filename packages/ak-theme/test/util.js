import { tagName, themeNameFromNode } from '../src/util';

describe('ak-theme, { themes }', () => {
  it('tagName', () => {
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
