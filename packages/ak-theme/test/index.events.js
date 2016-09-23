import { events } from '../src';

describe('index.events', () => {
  it('ak-theme', () => {
    expect(events.change).to.equal('themeChange');
  });

  it('ak-theme-prop', () => {
    expect(events.prop.change).to.equal('themePropChange');
  });
});
