import 'custom-event-polyfill';
import { vdom } from 'skatejs';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';
import keyCode from 'keycode';

import { createTemporary, removeTemporary, getRootNode } from './_helpers';
import RemoveButton from '../src/RemoveButton';


chai.use(chaiAsPromised);
chai.use(sinonChai);
chai.should();
const expect = chai.expect;


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
      expect(spy).to.have.been.called;
    });

    describe('should react to hovering', () => {
      it('when the mouse is over', () => {
        const mouseoverEvent = new CustomEvent('mouseover');
        rootNode.dispatchEvent(mouseoverEvent);
        expect(hoverSpy).to.have.been.calledOnce;
        expect(hoverSpy).to.have.been.calledWith(true);
      });

      it('when the mouse leaves', () => {
        const mouseoverEvent = new CustomEvent('mouseout');
        rootNode.dispatchEvent(mouseoverEvent);
        expect(hoverSpy).to.have.been.calledOnce;
        expect(hoverSpy).to.have.been.calledWith(false);
      });
    });

    describe('activation', () => {
      it('should be possible to activate the button via click', () => {
        const clickEvent = new CustomEvent('click');
        const preventDefaultSpy = sinon.spy(clickEvent, 'preventDefault');
        const stopPropagationSpy = sinon.spy(clickEvent, 'stopPropagation');
        rootNode.dispatchEvent(clickEvent);
        expect(activationSpy).to.have.been.calledOnce;
        expect(preventDefaultSpy).to.have.been.called;
        expect(stopPropagationSpy).to.have.been.called;
      });

      ['SPACE', 'ENTER'].forEach(keyName =>
        it(`should be possible to activate the button via "${keyName}"`, () => {
          const keyPressEvent = new CustomEvent('keydown');
          keyPressEvent.keyCode = keyCode(keyName);
          const preventDefaultSpy = sinon.spy(keyPressEvent, 'preventDefault');
          const stopPropagationSpy = sinon.spy(keyPressEvent, 'stopPropagation');
          rootNode.dispatchEvent(keyPressEvent);
          expect(activationSpy).to.have.been.called;
          expect(preventDefaultSpy).to.have.been.called;
          expect(stopPropagationSpy).to.have.been.called;
        }));
    });
  });
});
