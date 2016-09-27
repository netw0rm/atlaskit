import Theme, { events, Prop, themeable } from '../src';

describe('ak-theme', () => {
  it('default export', () => {
    expect(Theme).to.be.a('function');
  });

  it('named exports', () => {
    expect(events).to.be.an('object');
    expect(themeable).to.be.a('function', 'themeable');
    expect(Prop).to.be.a('function', 'Prop');
  });
});
