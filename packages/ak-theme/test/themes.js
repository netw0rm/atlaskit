import themes, { tagName, themeNameFromNode } from '../src/themes';

describe('ak-theme, { themes }', () => {
  it('should be an object', () => {
    expect(themes).to.be.an('object');
  });

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
