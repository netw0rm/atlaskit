import { afterMutations } from 'akutil-common-test';
import Theme, { Var } from '../src/index';
import themes from '../src/themes';

function createTheme(id = '', ownVars = {}) {
  const theme = new Theme();
  if (id) {
    theme.id = id;
  }
  Object.keys(ownVars).forEach(name => (
    theme.appendChild(Object.assign(new Var(), { name, value: ownVars[name] }))
  ));
  return theme;
}

describe('ak-theme', () => {
  let theme1;
  let theme2;
  let theme3;

  beforeEach(done => {
    theme1 = createTheme('theme1', { key1: 'val1' });
    theme2 = createTheme('theme2', { key2: 'val2' });
    theme3 = createTheme('theme3', { key3: 'val3' });

    document.body.appendChild(theme1);
    document.body.appendChild(theme2);
    document.body.appendChild(theme3);

    afterMutations(done);
  });

  afterEach(done => {
    theme1.remove();
    theme2.remove();
    theme3.remove();
    afterMutations(done);
  });

  it('should not be visible', () => {
    expect(window.getComputedStyle(theme1).display).to.equal('none');
  });

  it('allVars should be an object', () => {
    expect(createTheme().allVars).to.be.an('object');
  });

  it('allVars should contain mixed in themes', () => {
    theme1.mixin = 'theme2 theme3';
    expect(theme1.allVars).to.deep.equal({
      key1: 'val1',
      key2: 'val2',
      key3: 'val3',
    });
  });

  it('id should be string', () => {
    expect(createTheme().id).to.be.a('string');
  });

  it('id should be an attribute', () => {
    const theme = createTheme();
    expect(theme.hasAttribute('id')).to.equal(false);
    theme.id = 'theme';
    expect(theme.getAttribute('id')).to.equal('theme');
  });

  it('mixin should be a string', () => {
    expect(createTheme().mixin).to.be.a('string');
  });

  it('mixin should be an attribute', () => {
    const theme = createTheme();
    expect(theme.hasAttribute('mixin')).to.equal(false);
    theme.mixin = 'theme1 theme2 theme3';
    expect(theme.getAttribute('mixin')).to.equal('theme1 theme2 theme3');
  });

  it('mixins should be an array', () => {
    const theme = createTheme();
    theme.mixin = 'theme1 theme2 theme3';
    expect(theme.mixins).to.deep.equal(['theme1', 'theme2', 'theme3']);
  });

  it('ownVars should be an object', () => {
    const theme = createTheme();
    expect(theme.ownVars).to.be.an('object');
    expect(theme.ownVars).to.deep.equal({});
  });

  it('ownVars should not contain mixed in themes', () => {
    expect(theme1.ownVars).to.deep.equal({ key1: 'val1' });
  });

  it('should emit an event when attached', done => {
    const theme = createTheme('test', { key: 'val' });
    const spy = sinon.spy();
    document.addEventListener('ak-theme-test', spy);
    document.body.appendChild(theme);
    afterMutations(
      () => expect(spy.callCount).to.equal(1),
      () => expect(spy.getCall(0).args[0].detail).to.deep.equal({ key: 'val' }),
      () => theme.remove(),
      done
    );
  });

  it('should emit an event when detached', done => {
    const theme = createTheme('test', { key: 'val' });
    const spy = sinon.spy();
    document.body.appendChild(theme);
    afterMutations(
      () => document.addEventListener('ak-theme-test', spy),
      () => theme.remove(),
      () => expect(spy.callCount).to.equal(1),
      () => expect(spy.getCall(0).args[0].detail).to.equal(null),
      () => theme.remove(),
      done
    );
  });

  it('should empty the old theme vars if the id changes', done => {
    expect(themes.theme1Updated).to.equal(undefined);
    theme1.id = 'theme1Updated';
    afterMutations(
      () => expect(themes.theme1).to.equal(undefined),
      done
    );
  });

  it('should set the new theme vars if the id changes', done => {
    expect(themes.theme1).to.deep.equal(theme1.allVars);
    theme1.id = 'theme1Updated';
    afterMutations(
      () => expect(themes.theme1Updated).to.deep.equal(theme1.allVars),
      done
    );
  });

  it('should not re-render after the initial render', () => {
    // Setting the id to the same value should not re-render.
    expect(Theme.updated(theme1, { id: 'theme1' })).to.not.equal(true);

    // Setting the id to an updated value should not re-render because this
    // will not be considered the initial render.
    expect(Theme.updated(theme1, { id: 'theme1Updated' })).to.equal(false);

    // Passing an empthy previous value should cause it to render because that
    // indiciates that it is the initial render.
    expect(Theme.updated(theme1, null)).to.equal(true);
  });

  it('should not error when a theme var does not have a name', done => {
    const theme = new Theme();
    theme.appendChild(Object.assign(new Var(), { value: 'test' }));

    // This causes the theme to try and get the vars from its children. The
    // code that does this needs to guard against null names.
    document.body.appendChild(theme);

    // We also want to test to make sure no vars get set.
    afterMutations(
      () => expect(Object.keys(theme.ownVars).length).to.equal(0),
      done
    );
  });
});
