import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinonChai from 'sinon-chai';
import { emit } from 'skatejs';
import { waitUntil, getShadowRoot } from 'akutil-common-test';
import Footer from '../src/Footer';
import shadowStyles from '../src/Footer/shadow.less';

chai.use(sinonChai);
chai.use(chaiAsPromised);
chai.should();
const { expect } = chai;

describe('ak-editor-ui Footer', () => {
  let component;

  beforeEach(() => {
    component = new Footer();
    document.body.appendChild(component);
    return waitUntil(() => getShadowRoot(component) !== null);
  });

  afterEach(() => document.body.removeChild(component));

  it('should be possible to create a component', () => {
    expect(component.tagName).to.match(new RegExp('^ak-editor-ui-footer', 'i'));
  });

  describe('button events', () =>
    [
      { event: 'save', selector: `.${shadowStyles.locals.saveButton}` },
      { event: 'cancel', selector: `.${shadowStyles.locals.cancelButton}` },
      { event: 'insertmention', selector: `.${shadowStyles.locals.iconButton}:nth-child(1)` },
      { event: 'insertimage', selector: `.${shadowStyles.locals.iconButton}:nth-child(2)` },
    ].forEach(data =>
      describe('should trigger', () => {
        it(`${data.event} event on click`, () => {
          const spy = sinon.spy();
          component.addEventListener(data.event, spy);
          const button = getShadowRoot(component).querySelector(data.selector);
          emit(button, 'click');
          expect(spy).to.have.been.called;
        });
      })
    )
  );

  it('should hide buttons when hideButtons === true', () => {
    const shadowRoot = getShadowRoot(component);

    // Note: On Firefox, changing .hideButtons property is reflected in the skateJS component only
    //       after next "tick", so that buttons are theoretically visible for a short moment.
    component.hideButtons = true;

    return waitUntil(() => {
      const buttonGroup = shadowRoot.querySelector('ak-button-group');
      return buttonGroup instanceof HTMLElement &&
        buttonGroup.style.visibility === 'hidden';
    })
    .catch(() => {
      throw new Error('The button group did not become hidden');
    });
  });
});
