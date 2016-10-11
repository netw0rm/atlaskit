import 'custom-event-polyfill';
import { props } from 'skatejs';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinonChai from 'sinon-chai';
import AkButton from '../src/index.js';
import { akGridSize } from 'akutil-shared-styles';
import { name } from '../package.json';
import { waitUntil, getShadowRoot } from 'akutil-common-test';
import { getShadowButtonElem, createDivTest } from './_helpers';

chai.use(chaiAsPromised);
chai.use(sinonChai);
const expect = chai.expect;

describe('ak-button/default-behaviour', () => {
  let component;
  beforeEach(() => {
    component = new AkButton();
    document.body.appendChild(component);
    return waitUntil(() => getShadowRoot(component) !== null);
  });

  afterEach(() => document.body.removeChild(component));

  it('should not throws when component is instanciated', () =>
    expect(() => (new AkButton())).not.to.throw(Error)
  );

  it('should be possible to create a component', () => {
    expect(getShadowButtonElem(component)).to.be.defined;
    expect(component.tagName).to.match(new RegExp(`^${name}`, 'i'));
  });

  it('should call preventDefault when onmousedown event is triggered', () => {
    const button = getShadowButtonElem(component);
    const event = new CustomEvent('mousedown', {});
    sinon.spy(event, 'preventDefault');
    button.dispatchEvent(event);
    expect(event.preventDefault).to.have.been.called;
  });

  describe('attributes', () => {
    describe('defaults', () =>
      it('button should have type="button" by default', () =>
        expect(getShadowButtonElem(component).type).to.equal('button')
      )
    );

    describe('disabled', () => {
      beforeEach(() => (props(component, { disabled: true })));

      it('button should have pointer-events: none css attribute', () =>
        expect(window.getComputedStyle(component).pointerEvents).to.equal('none')
      );

      describe('when button has slotted elements', () => {
        const addSlottedElement = slotName => {
          const div = createDivTest({ slot: slotName });
          component.appendChild(div);
          return div;
        };

        [false, 'before'].forEach(slotName =>
          describe(`on ${slotName || 'default'} slot`, () =>
            it('slotted elements should have pointer-events: none css attribute', () => {
              const div = addSlottedElement(slotName);
              expect(window.getComputedStyle(div).pointerEvents).to.equal('none');
            })
          )
        );
      });
    });
  });

  describe('slots', () => {
    describe('before', () => {
      const div = createDivTest({ slotName: 'before' });
      beforeEach(() => component.appendChild(div));

      it('slotted element should have margin-right applied', () =>
        expect(window.getComputedStyle(div).marginRight).to.equal(akGridSize)
      );
    });

    describe('after', () => {
      const div = createDivTest({ slotName: 'after' });
      beforeEach(() => component.appendChild(div));

      it('slotted element should have margin-left applied', () =>
        expect(window.getComputedStyle(div).marginLeft).to.equal(akGridSize)
      );
    });
  });
});
