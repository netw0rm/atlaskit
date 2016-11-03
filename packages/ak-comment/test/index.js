import { afterMutations, getShadowRoot } from 'akutil-common-test';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import Component from '../src';

chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect;
const getSlots = component => getShadowRoot(component).querySelectorAll('slot,content');

describe('ak-comment', () => {
  let component;

  beforeEach((done) => {
    component = new Component();
    component.innerHTML = `
    <p is slot="avatar">avatar</p>
    <p is slot="author">author</p>
    <p is slot="time">time</p>
    <p is slot="actions">actions</p>
    <p is slot="reply">reply</p>
    <p>default slot</p>`;

    afterMutations(
      () => document.body.appendChild(component),
      done
    );
  });

  afterEach(() => {
    document.body.removeChild(component);
  });

  it('should slot content correctly', (done) => {
    afterMutations(
      () => getSlots(component),
      (slots) => {
        const expectedSlots = ['avatar', null, 'author', 'time', 'actions', 'reply'];
        Array.from(slots).map(slot => slot.getAttribute('name')).should.deep.equal(expectedSlots);
        return slots;
      },
      (slots) => {
        Array.from(slots).forEach(slot => expect(slot.assignedNodes().length).to.not.equal(0));
      },
      done
    );
  });
});
