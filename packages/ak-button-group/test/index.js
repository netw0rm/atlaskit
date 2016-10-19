import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { Component } from 'skatejs';
import Button from 'ak-button';
import { waitUntil, getShadowRoot } from 'akutil-common-test';

import ButtonGroup from '../src';


chai.use(chaiAsPromised);
chai.should();

describe('ak-button-group', () => {
  let container;
  let btnGroup;

  // Helper functions for getting various parts of the shadowDOM
  const componentHasShadowRoot = () => (getShadowRoot(btnGroup) !== null);

  function setupButtonGroup() {
    btnGroup = new ButtonGroup();
    container = document.createElement('div');
    container.appendChild(btnGroup);
    document.body.appendChild(container);
    return waitUntil(componentHasShadowRoot);
  }

  function tearDownContainer(done) {
    document.body.removeChild(container);
    setTimeout(done, 0);
  }

  beforeEach(setupButtonGroup);
  afterEach(tearDownContainer);

  it('should be possible to create a component', () => {
    (new ButtonGroup()).should.be.instanceof(Component);
  });

  it('group that x-overflows its container should stay on same line i.e. same height', (done) => {
    const addBtn = () => {
      const newBtn = new Button();
      newBtn.innerText = 'Hello';
      btnGroup.appendChild(newBtn);
    };
    addBtn();

    btnGroup.parentElement.style.width = '200px';
    setTimeout(() => {
      const initialHeight = btnGroup.offsetHeight;

      addBtn();
      addBtn();
      addBtn();
      addBtn();
      addBtn();
      addBtn();

      setTimeout(() => {
        btnGroup.offsetHeight.should.equal(initialHeight);
        done();
      });
    });
  });
});
