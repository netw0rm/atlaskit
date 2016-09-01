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
});
