import { createEvent, fixtures } from 'ak-editor-test';
import { afterMutations } from 'akutil-common-test';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinonChai from 'sinon-chai';

import { name } from '../package.json';
import Component from '../src';

chai.use(chaiAsPromised);
chai.use(sinonChai);
chai.should();
const expect = chai.expect;

const fixture = fixtures();

describe(name, () => {
  function spyOnKeyup(keyCode, eventName) {
    const spy = sinon.spy();
    const component = new Component();
    const tmpContainer = fixture();
    tmpContainer.appendChild(component);
    tmpContainer.addEventListener(eventName, spy);

    const event = createEvent('keyup');
    event.keyCode = keyCode;

    return new Promise((resolve) => {
      afterMutations(() => {
        component.shadowRoot.querySelector('input').dispatchEvent(event);
        resolve(spy);
      });
    });
  }

  it('should be possible to create a component', () => {
    const component = new Component();
    expect(component.tagName).to.match(new RegExp(`^${name}`, 'i'));
  });

  it('should emit enterKeyup event on enter keyup', () =>
     spyOnKeyup(13, 'enterKeyup')
      .then((spy) => {
        expect(spy).to.have.callCount(1);
      })
  );

  it('should emit escKeyup event on ESC keyup', () =>
     spyOnKeyup(27, 'escKeyup')
      .then((spy) => {
        expect(spy).to.have.callCount(1);
      })
  );
});
