import 'custom-event-polyfill';
import { props } from 'skatejs';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinonChai from 'sinon-chai';
import { akGridSize } from 'akutil-shared-styles';
import {
  getShadowButtonElem,
  createDivTest,
  setup,
  tearDownComponent,
} from './_helpers';

chai.use(chaiAsPromised);
chai.use(sinonChai);
const expect = chai.expect;


describe('ak-button/default-behaviour', () => {
  let component;
  beforeEach(() => setup().then(c => (component = c)));

  afterEach(() => tearDownComponent(component));

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

    describe('target set and href not set', () => {
      beforeEach(() => (props(component, { target: 'something' })));

      it('button should not have target attribute set', () =>
        expect(getShadowButtonElem(component).getAttribute('target')).to.not.be.defined
      );
    });

    describe('disabled', () => {
      beforeEach(() => (props(component, { disabled: true })));

      it('button should have pointer-events: none css attribute', () =>
        expect(window.getComputedStyle(component).pointerEvents).to.equal('none')
      );

      describe('when button has slotted elements', () => {
        const addSlottedElement = (slotName) => {
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
