import { afterMutations, checkInvisibility } from 'akutil-common-test';
import Theme, { events, Prop } from '../src';

function createTheme(id = '', ownVars = {}) {
  const theme = new Theme();
  if (id) {
    theme.id = id;
  }
  Object.keys(ownVars).forEach(name => (
    theme.appendChild(Object.assign(new Prop(), { name, value: ownVars[name] }))
  ));
  return theme;
}

describe('ak-theme', () => {
  let body;
  let theme1;
  let theme2;
  let theme3;

  beforeEach(done => {
    body = document.body;

    theme1 = createTheme('theme1', {
      key1: 'theme1 val1',
    });
    theme2 = createTheme('theme2', {
      key2: 'theme2 val2',
      key4: 'theme2 val4',
    });
    theme3 = createTheme('theme3', {
      key3: 'theme3 val3',
      key4: 'theme3 val4',
    });

    body.appendChild(theme1);
    body.appendChild(theme2);
    body.appendChild(theme3);

    afterMutations(done);
  });

  afterEach(done => {
    body.removeChild(theme1);
    body.removeChild(theme2);
    body.removeChild(theme3);
    afterMutations(done);
  });

  it('should not be visible', () => {
    expect(checkInvisibility(theme1)).to.equal(true, 'invisible');
  });

  it('allVars should be an object', () => {
    expect(createTheme().allVars).to.be.an('object');
  });

  it('allVars should contain mixed in themes', () => {
    expect(theme1.allVars).to.deep.equal({
      key1: 'theme1 val1',
    }, 'mixin=""');
    theme1.mixin = 'theme3 theme2';
    expect(theme1.allVars).to.deep.equal({
      key1: 'theme1 val1',
      key2: 'theme2 val2',
      key3: 'theme3 val3',
      key4: 'theme2 val4',
    }, 'mixin="theme3 theme2"');
    theme1.mixin = 'theme2 theme3';
    expect(theme1.allVars).to.deep.equal({
      key1: 'theme1 val1',
      key2: 'theme2 val2',
      key3: 'theme3 val3',
      key4: 'theme3 val4',
    }, 'mixin="theme2 theme3"');
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

  it('ownVars should be an object', () => {
    const theme = createTheme();
    expect(theme.ownVars).to.be.an('object');
    expect(theme.ownVars).to.deep.equal({});
  });

  it('ownVars should not contain mixed in themes', () => {
    const ownVars = {
      key1: 'theme1 val1',
    };
    expect(theme1.ownVars).to.deep.equal(ownVars);
    theme1.mixin = 'theme3 theme2';
    expect(theme1.ownVars).to.deep.equal(ownVars);
    theme1.mixin = 'theme2 theme3';
    expect(theme1.ownVars).to.deep.equal(ownVars);
  });

  it('should emit an event when attached', done => {
    const theme = createTheme('test', { key: 'val' });
    const spy = sinon.spy();
    document.addEventListener(events.change, spy);
    body.appendChild(theme);
    afterMutations(
      () => expect(spy.called).to.equal(true),
      () => expect(spy.lastCall.args[0].detail).to.deep.equal({
        themeName: 'test',
        themeProps: { key: 'val' },
      }),
      () => body.removeChild(theme),
      done
    );
  });

  it('should emit an event when detached', done => {
    const theme = createTheme('test', { key: 'val' });
    const spy = sinon.spy();
    body.appendChild(theme);
    afterMutations(
      () => document.addEventListener(events.change, spy),
      () => body.removeChild(theme),
      () => expect(spy.called).to.equal(true),
      () => expect(spy.lastCall.args[0].detail).to.deep.equal({
        themeName: 'test',
        themeProps: null,
      }),
      done
    );
  });

  it('should emit an event when attached again after being detached', done => {
    const theme = createTheme('test', { key: 'val' });
    const spy = sinon.spy();
    document.addEventListener(events.change, spy);

    body.appendChild(theme);
    afterMutations(
      () => expect(spy.called).to.equal(true, 'attach 1'),
      () => spy.reset(),
      () => body.removeChild(theme),
      () => expect(spy.called).to.equal(true, 'detach 1'),
      () => spy.reset(),
      () => body.appendChild(theme),
      () => expect(spy.called).to.equal(true, 'attach 2'),
      () => spy.reset(),
      () => body.removeChild(theme),
      () => expect(spy.called).to.equal(true, 'detach 2'),
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

  it('should not error when a theme prop does not have a name', done => {
    const theme = new Theme();
    theme.appendChild(Object.assign(new Prop(), { value: 'test' }));

    // This causes the theme to try and get the vars from its children. The
    // code that does this needs to guard against null names.
    document.body.appendChild(theme);

    // We also want to test to make sure no vars get set.
    afterMutations(
      () => expect(Object.keys(theme.ownVars).length).to.equal(0),
      done
    );
  });

  describe('dot-notation', () => {
    it('should support dot-notation', done => {
      const theme = createTheme('theme', {
        mykey1: 'mykey1',
        'my.key2': 'mykey2',
        'my.key.3': 'mykey3',
      });
      document.body.appendChild(theme);
      afterMutations(
        () => {
          const props = theme.ownVars;
          expect(props.mykey1).to.equal('mykey1');
          expect(props.my.key2).to.equal('mykey2');
          expect(props.my.key[3]).to.equal('mykey3');
        },
        done
      );
    });

    it('should overwrite namespaces', done => {
      const theme = createTheme('theme', {
        my: 'my',
        'my.key': 'mykey',
        'my.key.subkey': 'mykeysubkey',
      });
      document.body.appendChild(theme);
      afterMutations(
        () => expect(theme.ownVars.my).to.deep.equal({ key: { subkey: 'mykeysubkey' } }),
        done
      );
    });
  });
});
