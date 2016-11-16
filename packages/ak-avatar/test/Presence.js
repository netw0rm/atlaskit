import { createTemporaryComponent, tearDownComponent, getShadowRoot } from 'akutil-common-test'; // eslint-disable-line  max-len
import { vdom, define } from 'skatejs';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';

import Presence from '../src/Presence';


chai.use(chaiAsPromised);
chai.use(sinonChai);
chai.should();
const expect = chai.expect;

function createDefinition(presence) {
  return {
    render() {
      return (<Presence presence={presence} />);
    },
  };
}


describe.skip('ak-avatar', () => {
  describe('Presence', () => {
    let component;

    afterEach(() => tearDownComponent(component));

    // each of these should cause no presence to be rendered
    const invalidPresences = [null, 'none', 'spooky'];
    invalidPresences.forEach((presence) => {
      it(`should not render content if presence="${presence}"`, () => {
        const definition = createDefinition(presence);
        return createTemporaryComponent(define, definition)
          .then((newComponent) => {
            component = newComponent;
            expect(getShadowRoot(component).children.length).to.equal(0);
          });
      });
    });

    const validPresences = ['online', 'offline', 'busy'];
    validPresences.forEach((presence) => {
      it(`should render content anything if presence="${presence}"`, () => {
        const definition = createDefinition(presence);
        return createTemporaryComponent(define, definition)
          .then((newComponent) => {
            component = newComponent;
            expect(getShadowRoot(component).children.length).to.equal(1);
          });
      });
    });
  });
});
