import { getColumnWidth } from '../src/internal/GridColumnElement';

import { name } from '../package.json';

describe(name, () => {
  it('gridColumns should have no default width (flex-basis)', () => {
    const props = {};
    const result = getColumnWidth(props);

    expect(result).to.equal(0);
  });

  it('gridColumns should ', () => {
    const props = {
      medium: 8,
      theme: {
        columns: 12,
        spacing: 'cosy',
      },
    };
    const result = getColumnWidth(props);

    expect(result).to.equal('calc(100% / 12 * 8 - 16px)');
  });
});
