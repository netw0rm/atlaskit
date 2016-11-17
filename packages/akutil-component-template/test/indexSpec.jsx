import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import chaiEnzyme from 'chai-enzyme';

import { name } from '../package.json';

chai.use(chaiAsPromised);
chai.use(chaiEnzyme);
chai.should();

describe(name, () => {
  it('should work', () => {
    true.should.be.true;
  });
});
