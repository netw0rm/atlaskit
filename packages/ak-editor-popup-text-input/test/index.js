import { createEvent } from 'ak-editor-test';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinonChai from 'sinon-chai';

import { name } from '../package.json';
import Component from '../src';


chai.use(chaiAsPromised);
chai.use(sinonChai);
chai.should();
const expect = chai.expect;

describe(name, () => {
  function spyOnKeyup(keyCode) {
    const spy = sinon.spy();
    const component = new Component();
    const div = document.createElement('div');
    div.innerHTML = component;
    div.addEventListener('enterKeyup', spy);

    const event = createEvent('keyup');
    event.keyCode = keyCode;
    component.dispatchEvent(event);
  }

  it('should be possible to create a component', () => {
    const component = new Component();
    expect(component.tagName).to.match(new RegExp(`^${name}`, 'i'));
  });

  it('should emit enterKeyup event on enter keyup', () => {
    const spy = spyOnKeyup(13);
    expect(spy).to.have.callCount(1);
  });

  it('should emit escKeyup event on ESC keyup', () => {
    const spy = spyOnKeyup(27);
    expect(spy).to.have.callCount(1);
  });
});
