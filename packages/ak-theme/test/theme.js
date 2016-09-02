import { afterMutations } from 'akutil-common-test';
import Theme from '../src/index';

describe('ak-theme', () => {
  let theme;

  beforeEach(done => {
    theme = new Theme();
    document.body.appendChild(theme);
    afterMutations(done);
  });

  afterEach(done => {
    document.body.removeChild(theme);
    afterMutations(done);
  });

  it('should not be visible', () => {
    expect(window.getComputedStyle(theme).display).to.equal('none');
  });

  it('allVars should be an object', () => {

  });

  it('allVars should contain mixed in themes', () => {

  });

  it('id should be string', () => {

  });

  it('id should be an attribute', () => {

  });

  it('mixin should be a string', () => {

  });

  it('mixin should be an attribute', () => {

  });

  it('mixins should be an array', () => {

  });

  it('ownVars should be an object', () => {

  });

  it('ownVars should not contain mixed in themes', () => {

  });

  it('should emit an event when attached', () => {

  });

  it('should emit an event when detached', () => {

  });

  it('should empty the old theme vars if the id changes', () => {

  });

  it('should set the new theme vars if the id changes', () => {

  });

  it('should not re-render after the initial render', () => {

  });
});
