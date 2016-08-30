import { afterMutations } from 'akutil-common-test';
import Component from '..';

describe('ak-theme', () => {
  let component;

  beforeEach((done) => {
    component = new Component();
    document.body.appendChild(component);
    afterMutations(done);
  });

  afterEach((done) => {
    document.body.removeChild(component);
    afterMutations(done);
  });

  it('should be possible to create a component', () => {
    expect(window.getComputedStyle(component).display).to.equal('none');
  });
});
