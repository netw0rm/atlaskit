import Picker, * as other from '../../src';
import { name } from '../../package.json';

describe(name, () => {
  describe('exports', () => {
    it('should export a base component', () => {
      expect(Picker).not.toBe(null);
      expect(other.default).toBe(Picker);
    });
  });
});
