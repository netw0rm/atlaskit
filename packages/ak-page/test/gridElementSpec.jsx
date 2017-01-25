import chai from 'chai';
import { getMargin, getMaxWidth, getPadding } from '../src/internal/GridElement';

import { name } from '../package.json';

chai.should();

describe(name, () => {
  it('grid should have no max-width if fluid', () => {
    const props = {};
    const result = getMaxWidth(props);

    expect(result).to.equal('100%');
  });

  it('grid should have a max-width if fixed', () => {
    const props = {
      layout: 'fixed',
      theme: {
        columns: 12,
      },
    };
    const result = getMaxWidth(props);

    expect(result).to.equal('960px');
  });

  it('grid should have a narrower max-width if there are less columns', () => {
    const props = {
      layout: 'fixed',
      theme: {
        columns: 10,
      },
    };
    const result = getMaxWidth(props);

    expect(result).to.equal('800px');
  });

  it('grid margin should be auto by default', () => {
    const props = {
      theme: {
        isNestedGrid: false,
      },
    };
    const result = getMargin(props);

    expect(result).to.equal('auto');
  });

  it('grid margin should be negative if it is nested', () => {
    const props = {
      theme: {
        spacing: 'cosy',
        isNestedGrid: true,
      },
    };
    const result = getMargin(props);

    expect(result).to.equal('-16px');
  });

  it('grid spacing should affect padding', () => {
    const props = {
      theme: {
        spacing: 'cosy',
      },
    };
    const result = getPadding(props);

    expect(result).to.equal('8px');
  });
});
