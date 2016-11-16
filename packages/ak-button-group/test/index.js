import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { Component } from 'skatejs';
import Button from 'ak-button';
import { waitUntil, getShadowRoot } from 'akutil-common-test';
import shadowStyles from '../src/shadow.less';

import ButtonGroup from '../src';

chai.use(chaiAsPromised);
chai.should();

describe.skip('ak-button-group', () => {
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

  it('group that x-overflows its container should stay on same line i.e. same height', () => {
    let initialHeight;
    const addBtn = () => {
      const newBtn = new Button();
      newBtn.innerText = 'Hello';
      btnGroup.appendChild(newBtn);
      return waitUntil(() => {
        const slot = getShadowRoot(btnGroup)
          .querySelector(`.${shadowStyles.locals.defaultSlotElement}`);
        return slot.assignedNodes().indexOf(newBtn) > -1;
      });
    };
    return addBtn()
      .then(() => {
        initialHeight = btnGroup.offsetHeight;
        btnGroup.parentElement.style.width = '200px';
        return new Promise(resolve => (setTimeout(resolve)));
      })
      .then(() => {
        initialHeight = btnGroup.offsetHeight;
        return Promise.all([
          addBtn(),
          addBtn(),
          addBtn(),
          addBtn(),
          addBtn(),
          addBtn(),
        ]);
      })
      .then(() => waitUntil(() => btnGroup.offsetHeight === initialHeight)).should.be.fulfilled;
  });
});
