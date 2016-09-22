import { name } from '../package.json';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinonChai from 'sinon-chai';
import { emit } from 'skatejs';
import Component from '../src';
import shadowStyles from '../src/shadow.less';
import { waitUntil, getShadowRoot } from 'akutil-common-test';

chai.use(sinonChai);
chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect;

describe(name, () => {
  let component;

  beforeEach(() => {
    component = new Component();
    document.body.appendChild(component);
    return waitUntil(() => getShadowRoot(component) !== null);
  });

  afterEach(() => document.body.removeChild(component));

  it('should be possible to create a component', () => {
    expect(component.tagName).to.match(new RegExp(`^${name}`, 'i'));
  });

  describe('button events', () =>
    [
      { event: 'save', selector: `.${shadowStyles.locals.saveButton}` },
      { event: 'cancel', selector: `.${shadowStyles.locals.cancelButton}` },
      { event: 'insertmention', selector: `.${shadowStyles.locals.iconButton}:nth-child(1)` },
      { event: 'insertimage', selector: `.${shadowStyles.locals.iconButton}:nth-child(2)` },
    ].forEach(data =>
      describe('should trigger', () => {
        it(`${data.event} event`, () => {
          const spy = sinon.spy();
          component.addEventListener(data.event, spy);
          const button = getShadowRoot(component).querySelector(data.selector);
          emit(button, 'click');
          expect(spy).to.have.been.called;
        });
      })
    )
  );
});
