import { getLayerPosition } from '../../src/utils';

describe('Tooltip helpers', () => {
  describe('getLayerPosition', () => {
    const testCases = [
      { position: 'top', expected: 'top center' },
      { position: 'bottom', expected: 'bottom center' },
      { position: 'left', expected: 'left middle' },
      { position: 'right', expected: 'right middle' },
    ];

    testCases.forEach((test) => {
      it(`should correctly translate position=${test.position}`, () => {
        expect(getLayerPosition(test.position)).to.equal(test.expected);
      });
    });
  });
});
