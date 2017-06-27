import { expect } from 'chai';
import { breakpointSize } from '../../src/utils';

test('breakpointSize', () => {
  const sizes = {
    small: 173,
    large: 300
  };

  it('should return right breakpoint name based on passed width', () => {
    expect(breakpointSize(200, sizes)).to.be('large');
  });

  it('should return the first key as default value', () => {
    expect(breakpointSize(100, sizes)).to.be('small');
  });
});
