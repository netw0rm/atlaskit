/** @jsx vdom */

import 'custom-event-polyfill';
import { vdom } from 'skatejs';
import keyCode from 'keycode';

import { createTemporary, removeTemporary, getRootNode } from './_helpers';
import Chrome from '../src/Chrome';

describe.skip('ak-tag', () => {
  describe('Chrome', () => {
    let component;
    let rootNode;

    afterEach(() => removeTemporary(component));

    describe('unlinked', () => {
      const definition = {
        render() {
          return (<Chrome>whatever</Chrome>);
        },
      };

      beforeEach(() => createTemporary(definition)
        .then((newComponent) => {
          component = newComponent;
          rootNode = getRootNode(component);
        }));

      it('should not be possible to tab to the tag', () => {
        expect(rootNode.tabIndex).to.equal(-1);
      });

      it('should not be possible to focus the chrome via mouse', () => {
        const mousedownEvent = new CustomEvent('mousedown', {});
        const spy = sinon.spy(mousedownEvent, 'preventDefault');
        rootNode.dispatchEvent(mousedownEvent);
        expect(spy.called).to.equal(true);
      });

      it('should pass the children through', () => {
        expect(rootNode.textContent).to.equal('whatever');
      });
    });

    describe('linked', () => {
      const clickSpy = sinon.spy();
      const definition = {
        render() {
          /* eslint-disable jsx-a11y/href-no-hash */
          return (
            <Chrome isLinked>
              <a onClick={clickSpy} href="#">link</a>
            </Chrome>
          );
          /* eslint-enable jsx-a11y/href-no-hash */
        },
      };

      beforeEach(() => createTemporary(definition)
        .then((newComponent) => {
          component = newComponent;
          rootNode = getRootNode(component);
        }));

      it('should be possible to tab to the tag', () => {
        expect(rootNode.tabIndex).to.equal(0);
      });

      ['SPACE', 'ENTER'].forEach(keyName =>
        it(`should be possible to activate the link via "${keyName}"`, () => {
          const keyPressEvent = new CustomEvent('keydown');
          keyPressEvent.keyCode = keyCode(keyName);
          rootNode.dispatchEvent(keyPressEvent);
          expect(clickSpy.called).to.equal(true);
        }));
    });
  });
});
