import { afterMutations } from 'akutil-common-test';
import Component from '..';

const { expect } = window.chai;

describe('ak-theme', () => {
  let component;

  beforeEach((done) => {
    component = new Component();
    document.body.appendChild(component);
    afterMutations(done);
  });

  afterEach(() => {
    document.body.removeChild(component);
  });

  it('should be possible to create a component', () => {
    expect(component).to.not.be.visible;
  });
});
