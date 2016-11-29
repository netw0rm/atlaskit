/** @jsx vdom */

import 'custom-event-polyfill';
import { vdom } from 'skatejs';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';

import { createTemporary, removeTemporary, getRootNode } from './_helpers';
import Label from '../src/Label';


chai.use(chaiAsPromised);
chai.use(sinonChai);
chai.should();
const expect = chai.expect;


describe.skip('ak-tag', () => {
  describe('Label', () => {
    let component;
    let rootNode;

    afterEach(() => removeTemporary(component));

    describe('unlinked', () => {
      const definition = {
        render() {
          return (<Label>whatever</Label>);
        },
      };

      beforeEach(() => createTemporary(definition)
        .then((newComponent) => {
          component = newComponent;
          rootNode = getRootNode(component);
        }));

      it('should not be a link', () => {
        expect(rootNode.tagName).to.not.equal('A');
      });
    });

    describe('linked', () => {
      const linkHref = 'http://some.link';
      const definition = {
        render() {
          return (<Label href={linkHref} />);
        },
      };

      beforeEach(() => createTemporary(definition)
        .then((newComponent) => {
          component = newComponent;
          rootNode = getRootNode(component);
        }));

      it('should be a link', () => {
        expect(rootNode.tagName).to.equal('A');
      });

      it('should not be possible to tab to the link', () => {
        expect(rootNode.tabIndex).to.equal(-1);
      });

      it('should have the right href', () => {
        expect(rootNode.getAttribute('href')).to.equal(linkHref);
      });
    });
  });
});
