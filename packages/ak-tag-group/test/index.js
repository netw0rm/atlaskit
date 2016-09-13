import { afterMutations, getShadowRoot, waitUntil } from 'akutil-common-test';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';
import TagGroup from '../src';
import Tag from 'ak-tag';

chai.use(chaiAsPromised);
chai.use(sinonChai);
chai.should();

const getSlots = (component) => getShadowRoot(component).querySelectorAll('slot,content');

describe('ak-tag-group', () => {
  let component;

  beforeEach(() => {
    component = new TagGroup();
    document.body.appendChild(component);
    return waitUntil(() => !!getShadowRoot(component));
  });

  afterEach(() => {
    document.body.removeChild(component);
  });

  it('should be possible to create a component', (done) => {
    afterMutations(
      () => getSlots(component),
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

  it('should be possible to add tags to a tag group', (done) => {
    const tags = ['Candy canes', 'Tiramisu', 'Gummi bears']
      .map((tagName) => {
        const tag = new Tag();
        tag.text = tagName;
        return tag;
      });

    afterMutations(
      () => tags.forEach((tag) => component.appendChild(tag)),
      () => getSlots(component)[0].assignedNodes(),
      (assignedNodes) => assignedNodes.should.be.deep.equal(tags),
      done
    );
  });
});
