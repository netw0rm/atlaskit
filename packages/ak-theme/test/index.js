import Theme, { events, themeable, Var } from '../src';

describe('ak-theme', () => {
  it('default export', () => {
    expect(Theme).to.be.a('function');
  });

  it('named exports', () => {
    expect(events).to.be.an('object');
    expect(themeable).to.be.a('function', 'themeable');
    expect(Var).to.be.a('function', 'Var');
  });
});
