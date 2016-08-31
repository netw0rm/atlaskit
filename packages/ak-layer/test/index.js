import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import LayerWC from '../src/index';
import { afterMutations } from 'akutil-common-test';

chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect;

describe('ak-layer: logic', () => {
  let fixture;
  beforeEach(() => {
    fixture = document.createElement('div');
    document.body.appendChild(fixture);
  });

  afterEach(() => {
    document.body.removeChild(fixture);
  });

  it('should be possible to create a component', () => {
    expect(() => new LayerWC()).not.to.throw(Error);
  });

  it('should have an alignment object attached', (done) => {
    const component = new LayerWC();
    fixture.appendChild(component);

    afterMutations(
      () => expect(component.alignment).not.to.equal(undefined),
      done
    );
  });
});
