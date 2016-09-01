import Theme, { themeable } from '../src';

describe('ak-theme', () => {
  it('default export', () => {
    expect(Theme).to.be.a('function');
  });

  it('named exports', () => {
    expect(themeable).to.be.a('function');
  });
});
