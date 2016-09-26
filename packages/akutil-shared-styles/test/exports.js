import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(sinonChai);
chai.use(chaiAsPromised);
chai.should();

import * as lessVars from '../src';

describe('exports', () => {
  it('should be possible to import named', () => {
    lessVars.should.have.property('akBorderRadius');
  });
});
