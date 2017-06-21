import * as React from 'react';
import { render } from 'enzyme';
import { expect } from 'chai';
import NumericAvatar from '../../src/components/NumericAvatar';

function setupNumericAvatar(num: number) {
  return render(
    <NumericAvatar num={num} />
  );
}

describe('NumericAvatar', () => {
  it('should cap numbers at 99', () => {
    const numvatar = setupNumericAvatar(100);
    expect(numvatar.text()).contains('99+');
  });

  it('should round floating point numbers', () => {
    const numvatar = setupNumericAvatar(12.3);
    expect(numvatar.text()).contains('13');
  });

  it('should not display numbers less than 0', () => {
    const numvatar = setupNumericAvatar(-1);
    expect(numvatar.text()).contains('0');
  });
});
