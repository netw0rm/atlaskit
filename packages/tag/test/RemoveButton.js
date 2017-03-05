/** @jsx vdom */

import 'custom-event-polyfill';
import { vdom } from 'skatejs';
import keyCode from 'keycode';

import { createTemporary, removeTemporary, getRootNode } from './_helpers';
import RemoveButton from '../src/RemoveButton';

// eslint-disable-next-line mocha/no-skipped-tests
describe.skip('ak-tag', () => {
  describe('RemoveButton', () => {
    let component;
    let rootNode;
    const text = 'whatever';
    let hoverSpy;
    let activationSpy;

    const definition = {
      render() {
        return (
          <RemoveButton
            text={text}
            onHoverStateChange={hoverSpy}
            onActivation={activationSpy}
          />
        );
      },
    };

    afterEach(() => removeTemporary(component));
    beforeEach(() => {
      hoverSpy = sinon.spy();
      activationSpy = sinon.spy();
      return createTemporary(definition)
        .then((newComponent) => {
          component = newComponent;
          rootNode = getRootNode(component);
        });
    });

    it('should show the text as an aria label', () => {
      expect(rootNode.getAttribute('aria-label')).to.be.equal(text);
    });

    it('should not be possible to focus the button via mouse', () => {
      const mousedownEvent = new CustomEvent('mousedown', {});
      const spy = sinon.spy(mousedownEvent, 'preventDefault');
      rootNode.dispatchEvent(mousedownEvent);
      expect(spy.called).to.equal(true);
    });

    describe('should react to hovering', () => {
      it('when the mouse is over', () => {
        const mouseoverEvent = new CustomEvent('mouseover');
        rootNode.dispatchEvent(mouseoverEvent);
        expect(hoverSpy.callCount).to.equal(1);
        expect(hoverSpy.calledWith(true)).to.equal(true);
      });

      it('when the mouse leaves', () => {
        const mouseoverEvent = new CustomEvent('mouseout');
        rootNode.dispatchEvent(mouseoverEvent);
        expect(hoverSpy.callCount).to.equal(1);
        expect(hoverSpy.calledWith(false)).to.equal(true);
      });
    });

    describe('activation', () => {
      it('should be possible to activate the button via click', () => {
        const clickEvent = new CustomEvent('click');
        const preventDefaultSpy = sinon.spy(clickEvent, 'preventDefault');
        const stopPropagationSpy = sinon.spy(clickEvent, 'stopPropagation');
        rootNode.dispatchEvent(clickEvent);
        expect(activationSpy.callCount).to.equal(1);
        expect(preventDefaultSpy.called).to.equal(true);
        expect(stopPropagationSpy.called).to.equal(true);
      });

      ['SPACE', 'ENTER'].forEach(keyName =>
        it(`should be possible to activate the button via "${keyName}"`, () => {
          const keyPressEvent = new CustomEvent('keydown');
          keyPressEvent.keyCode = keyCode(keyName);
          const preventDefaultSpy = sinon.spy(keyPressEvent, 'preventDefault');
          const stopPropagationSpy = sinon.spy(keyPressEvent, 'stopPropagation');
          rootNode.dispatchEvent(keyPressEvent);
          expect(activationSpy.called).to.equal(true);
          expect(preventDefaultSpy.called).to.equal(true);
          expect(stopPropagationSpy.called).to.equal(true);
        }));
    });
  });
});
