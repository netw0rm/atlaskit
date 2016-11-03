import 'custom-event-polyfill';
import { props } from 'skatejs';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinonChai from 'sinon-chai';
import {
  getShadowAnchorElem,
  shadowDomQuery,
  setup,
  tearDownComponent,
} from './_helpers';

chai.use(chaiAsPromised);
chai.use(sinonChai);
const expect = chai.expect;


describe('ak-button/link-behaviour', () => {
  let component;
  const href = 'http://www.atlassian.com/';
  beforeEach(() => setup().then((c) => {
    component = c;
    props(component, { href });
  }));

  afterEach(() => tearDownComponent(component));

  it('should call preventDefault when onmousedown event is triggered', () => {
    const button = getShadowAnchorElem(component);
    const event = new CustomEvent('mousedown', {});
    sinon.spy(event, 'preventDefault');
    button.dispatchEvent(event);
    expect(event.preventDefault).to.have.been.called;
  });

  describe('attributes', () => {
    describe('type', () => {
      it('anchor should not have type attribute', () =>
        expect(getShadowAnchorElem(component).getAttribute('type')).to.not.be.defined
      );
    });

    describe('href', () => {
      it('anchor should have href attribute set', () => {
        const anchor = getShadowAnchorElem(component);
        expect(anchor).to.have.property('href', href);
        expect(anchor.getAttribute('href')).to.equal(href);
      });
    });

    describe('disabled', () => {
      const selector = 'span[disabled].button';
      beforeEach(() => (props(component, { disabled: true })));

      it('component should have pointer-events: none css attribute', () =>
        expect(window.getComputedStyle(component).pointerEvents).to.equal('none')
      );

      describe('shadow dom element', () => {
        it('should be a span', () =>
          expect(shadowDomQuery(component, selector)).to.be.defined
        );
      });
    });
  });
});
