import { expect } from 'chai';

import * as exported from '../src';
import { name } from '../package.json';

describe(name, () => {
  describe('exports', () => {
    it('should not export a base component', () => {
      expect(exported['default']).to.equal(undefined);
    });
  });
});
