import Theme, { themeable } from '..';

describe('API', () => {
  it('default export', () => {
    expect(Theme).to.be.a('function');
  });

  it('named exports', () => {
    expect(themeable).to.be.a('function');
  });
});
