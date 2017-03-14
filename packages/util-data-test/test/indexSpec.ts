import { expect } from 'chai';

import defaultExported from '../src';
import { name } from '../package.json';

describe(name, () => {
  describe('exports', () => {
    it('should not export a base component', () => {
      expect(defaultExported).to.not.equal(undefined);
    });
  });
});
