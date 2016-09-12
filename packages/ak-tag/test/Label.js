import 'custom-event-polyfill';
import { vdom } from 'skatejs';
import { getShadowRoot } from 'akutil-common-test';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';

import { createTemporary, removeTemporary } from './_helpers';
import Label from '../src/Label';


chai.use(chaiAsPromised);
chai.use(sinonChai);
chai.should();
const expect = chai.expect;


describe('ak-tag', () => {
  describe('Label', () => {
    let component;

    afterEach(() => removeTemporary(component));

    describe('unlinked', () => {
      const definition = {
        render() {
          return (<Label>whatever</Label>);
        },
      };

      beforeEach(() => createTemporary(definition).then(newComp => (component = newComp)));

      it('should be possible to create a tag Label', () => {
        expect(getShadowRoot(component)).to.be.defined;
      });

      it('should not be a link', () => {
        expect(getShadowRoot(component).firstChild.tagName).to.not.equal('A');
      });
    });

    describe('linked', () => {
      const linkHref = 'http://some.link';
      const definition = {
        render() {
          return (<Label href={linkHref} />);
        },
      };

      beforeEach(() => createTemporary(definition).then(newComp => (component = newComp)));

      it('should be a link', () => {
        expect(getShadowRoot(component).firstChild.tagName).to.equal('A');
      });

      it('should not be possible to tab to the link', () => {
        expect(getShadowRoot(component).firstChild.tabIndex).to.equal(-1);
      });

      it('should have the right href', () => {
        expect(getShadowRoot(component).firstChild.getAttribute('href')).to.equal(linkHref);
      });
    });
  });
});
