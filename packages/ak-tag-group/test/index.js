import { afterMutations, getShadowRoot } from 'akutil-common-test';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import TagGroup from '../src';

chai.use(chaiAsPromised);
chai.should();

describe('ak-tag-group', () => {
  let component;

  beforeEach((done) => {
    component = new TagGroup();

    afterMutations(
      // append component to the body to ensure it has been rendered.
      () => document.body.appendChild(component),
      done
    );
  });

  afterEach(() => {
    document.body.removeChild(component);
  });

  it('should be possible to create a component', (done) => {
    afterMutations(
      () => getShadowRoot(component).querySelectorAll('slot'),
      (nodes) => {
        const slots = Array.from(nodes);
        slots.length.should.be.equal(1);
        return slots.pop();
      },
      (slot) => {
        slot.should.be.an.instanceof(Node);
        slot.should.not.match(/name/);
      },
      done
    );
  });
});
