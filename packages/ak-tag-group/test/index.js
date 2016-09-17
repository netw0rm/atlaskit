import { Component } from 'skatejs';
import { afterMutations, getShadowRoot, waitUntil } from 'akutil-common-test';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';
import TagGroup, { alignment } from '../src';
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

  describe('exports', () => {
    it('should export a base component', () => {
      (new TagGroup).should.be.an.instanceof(Component);
    });

    it('should have an alignment export with defined alignment values', () => {
      alignment.should.be.defined;
      Object.keys(alignment).should.be.deep.equal(['start', 'end']);
    });
  });

  it('should have a slot for the tags', (done) => {
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
