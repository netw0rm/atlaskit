import themes, { tagName, themeName, themeNameFromNode } from '../src/themes';

describe('ak-theme, { themes }', () => {
  it('should be an object', () => {
    expect(themes).to.be.an('object');
  });

  it('tagName', () => {
    expect(tagName(document.createElement('x-test-a1b2c3d4'))).to.equal('x-test-a1b2c3d4');
  });

  it('themeName', () => {
    expect(themeName('x-test-a1b2c3d4')).to.equal('x-test');
  });

  it('themeNameFromNode', () => {
    expect(themeNameFromNode(document.createElement('x-test-a1b2c3d4'))).to.equal('x-test');
  });
});
