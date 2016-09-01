import { waitUntil, afterMutations, getShadowRoot } from 'akutil-common-test';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import Tag from '../src';

chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect; // eslint-disable-line no-unused-vars


describe('ak-tag', () => {
  let component;

  beforeEach(() => {
    component = new Tag();
    component.text = 'X';
    document.body.appendChild(component);

    return waitUntil(() => !!getShadowRoot(component));
  });

  afterEach(() => {
    document.body.removeChild(component);
  });

  it('should be possible to create a component', (done) => {
    component.text = 'Jelly beans';
    afterMutations(
      () => getShadowRoot(component).innerHTML.should.match(/Jelly beans/),
      done
    );
  });
});
