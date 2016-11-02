import chai from 'chai';
import sinonChai from 'sinon-chai';

import { keydown, keyup, keypress } from '../src';


chai.should();
chai.use(sinonChai);

describe('Keyboard interaction', () => {
  const utils = { keydown, keyup, keypress };
  ['keydown', 'keyup', 'keypress'].forEach((type) => {
    const key = utils[type];
    describe(`(${type})`, () => {
      it(`can fire ${type} events`, () => {
        const spy = sinon.spy();
        document.addEventListener(type, spy);
        key('[');
        document.removeEventListener(type, spy);
        spy.should.have.been.calledOnce;
      });
      it('meta keys can be specified', () => {
        let shiftPressed;
        const spy = (event) => {
          shiftPressed = event.shiftKey;
        };
        document.addEventListener(type, spy);
        key('[', {
          modifiers: {
            shiftKey: true,
          },
        });
        document.removeEventListener(type, spy);
        expect(shiftPressed).to.equal(true);
      });
      it('meta keys are initially off', () => {
        let modifiers;
        const spy = (event) => {
          modifiers = {
            shiftKey: event.shiftKey,
            metaKey: event.metaKey,
            altKey: event.altKey,
            ctrlKey: event.ctrlKey,
          };
        };
        document.addEventListener(type, spy);
        key('[');
        document.removeEventListener(type, spy);
        expect(!!modifiers.shiftKey).to.equal(false, 'shiftKey is off by default');
        expect(!!modifiers.metaKey).to.equal(false, 'metaKey is off by default');
        expect(!!modifiers.altKey).to.equal(false, 'altKey is off by default');
        expect(!!modifiers.ctrlKey).to.equal(false, 'ctrlKey is off by default');
      });
      it('target can be specified', () => {
        let target;
        const div = document.createElement('div');
        const spy = (event) => {
          target = event.target;
        };
        div.addEventListener(type, spy);
        key('[', {
          target: div,
        });
        div.removeEventListener(type, spy);
        expect(target).to.equal(div);
      });
    });
  });
});
