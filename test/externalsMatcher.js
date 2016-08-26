const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
chai.should();

const externalsMatcher = require('../build/lib/externalsMatcher.js');
const BABEL_RUNTIME_PATH = externalsMatcher.BABEL_RUNTIME_PATH;

const matchAgainst = (dep, context = '') => new Promise((resolve, reject) => {
  externalsMatcher(context, dep, (err, isExternal) => {
    if (err) {
      reject(err);
      return;
    }
    resolve(!!isExternal);
  });
});

describe('externalsMatcher', () => {
  it('should match module dependencies', () =>
    matchAgainst('skatejs').should.eventually.be.true);

  describe('relative dependencies', () => {
    it('should not match relative dependencies', () =>
      matchAgainst('../some/lib').should.eventually.be.false
    );

    it('should not match relative dependencies in a parent directory', () =>
      matchAgainst('../some/lib').should.eventually.be.false
    );
  });

  it('should not match dependencies with loaders', () =>
    matchAgainst('style!bla.less').should.eventually.be.false
  );

  describe('babel-runtime', () => {
    it('should not match babel-runtime', () =>
      matchAgainst('babel-runtime').should.eventually.be.false
    );

    it('should not match a babel-runtime sub-import', () =>
      matchAgainst('babel-runtime/helpers/defineProperty').should.eventually.be.false
    );

    it('should not match anything inside babel-runtime', () =>
      matchAgainst('core-js', BABEL_RUNTIME_PATH).should.eventually.be.false
    );
  });
});
