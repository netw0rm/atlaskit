import { define, emit } from 'skatejs';
import { afterMutations } from 'akutil-common-test';
import { tagName, themeNameFromNode } from '../src/themes';
import Theme, { events, themeable, Var } from '../src';

describe('ak-theme, { themeable }', () => {
  let body;

  beforeEach(() => {
    body = document.body;
  });

  describe('props', () => {
    let elem;
    let elemTheme;
    let elemThemeVar;

    beforeEach(done => {
      elem = new (define('x-test', themeable({})));
      body.appendChild(elem);

      elemTheme = new Theme();
      elemTheme.id = tagName(elem);
      body.appendChild(elemTheme);

      elemThemeVar = new Var();
      elemThemeVar.name = 'testname';
      elemThemeVar.value = 'testvalue';
      elemTheme.appendChild(elemThemeVar);

      afterMutations(done);
    });

    afterEach(done => {
      body.removeChild(elem);
      afterMutations(done);
    });

    describe('themeName', () => {
      it('should define an object', () => {
        expect(elem.constructor.props.themeName).to.be.an('object');
      });

      it('should override existing themeName', () => {
        const defBefore = { props: { themeName: {} } };
        const defAfter = themeable(defBefore);
        expect(defBefore.props.themeName).to.not.equal(defAfter.props.themeName);
      });

      it('should be a property', () => {
        expect(elem.themeName).to.equal(themeNameFromNode(elem));
      });

      it('should be an attribute', () => {
        expect(elem.getAttribute('theme-name')).to.equal(themeNameFromNode(elem));
      });

      describe('listeners', () => {
        let spyAddEventListener;
        let spyRemoveEventListener;

        beforeEach(() => {
          spyAddEventListener = sinon.spy(document, 'addEventListener');
          spyRemoveEventListener = sinon.spy(document, 'removeEventListener');
        });

        afterEach(() => {
          spyAddEventListener.restore();
          spyRemoveEventListener.restore();
        });

        it('should have a listener bound when attached', done => {
          // To check if listeners were added, we have to manually add it so that
          // the spies are registered before we add it to the document.
          const elemAfterSpies = document.createElement(themeNameFromNode(elem));
          document.body.appendChild(elemAfterSpies);
          afterMutations(
            () => expect(spyAddEventListener.callCount).to.equal(1),
            () => expect(spyAddEventListener.getCall(0).args[0]).to.equal(events.themeChanged),
            done
          );
        });

        it('should have listener unbound when detached', done => {
          // To check if listeners were removed we have to manually add it and
          // then remove it so we can check it after it's removed.
          const elemAfterSpies = document.createElement(themeNameFromNode(elem));
          document.body.appendChild(elemAfterSpies);
          afterMutations(
            () => body.removeChild(elemAfterSpies),
            () => expect(spyRemoveEventListener.callCount).to.equal(1),
            () => expect(spyRemoveEventListener.getCall(0).args[0]).to.equal(events.themeChanged),
            done
          );
        });
      });
    });

    describe('themeVars', () => {
      it('should define an object', () => {
        expect(elem.constructor.props.themeVars).to.be.an('object');
      });

      it('should override existing themeVars', () => {
        const defBefore = { props: { themeVars: {} } };
        const defAfter = themeable(defBefore);
        expect(defBefore.props.themeVars).to.not.equal(defAfter.props.themeVars);
      });

      it('should be a property', () => {
        expect(elem.themeVars).to.be.an('object');
      });

      it('should be an empty object if no theme exists', done => {
        elem.themeName = 'non-existent-theme';
        afterMutations(
          () => expect(Object.keys(elem.themeVars).length).to.equal(0),
          done
        );
      });

      it('should contain the current theme vars if it exists', () => {
        expect(elem.themeVars.testname).to.equal('testvalue');
      });

      it('should update when the event is triggered', () => {
        const themeName = tagName(elem);
        const themeVars = { test: true };
        emit(document, events.themeChanged, { detail: { themeName, themeVars } });
        expect(elem.themeVars.test).to.equal(true);
      });

      it('should update when the themeName is changed', done => {
        elemTheme.id = 'sadoijfioasdjfioadsoifjioafd';
        afterMutations(
          () => (elem.themeName = 'sadoijfioasdjfioadsoifjioafd'),
          () => expect(elem.themeVars.testname).to.equal('testvalue'),
          done
        );
      });

      it('should be empty when changed to a theme that does not exist', done => {
        elem.themeName = '';
        afterMutations(
          () => expect(Object.keys(elem.themeVars).length).to.equal(0),
          done
        );
      });
    });
  });

  describe('lifecycle', () => {
    function createElement(opts) {
      const e = new (define('x-test', themeable(opts)));
      document.body.appendChild(e);
      return e;
    }

    it('should call overridden attached', done => {
      createElement({
        attached(e) {
          body.removeChild(e);
          done();
        },
      });
    });

    it('should call overridden detached', done => {
      body.removeChild(createElement({
        detached() {
          done();
        },
      }));
    });
  });

  describe('creation order', () => {
    function createElement(name) {
      return new (define(name, themeable({})));
    }

    function createTheme(name) {
      const eTheme = new Theme();
      eTheme.id = name;

      const eThemeVar = new Var();
      eThemeVar.name = 'testname';
      eThemeVar.value = 'testvalue';
      eTheme.appendChild(eThemeVar);

      return eTheme;
    }

    it('theme before element', done => {
      const name = 'x-test-theme-before-element';
      const elem = createElement(name);
      const theme = createTheme(name);
      body.appendChild(theme);
      afterMutations(
        () => body.appendChild(elem),
        () => expect(elem.themeVars.testname).to.equal('testvalue'),
        () => {
          body.removeChild(elem);
          body.removeChild(theme);
        },
        done
      );
    });

    it('theme after element', done => {
      const name = 'x-test-theme-after-element';
      const elem = createElement(name);
      const theme = createTheme(name);
      body.appendChild(elem);
      afterMutations(
        () => body.appendChild(theme),
        () => expect(elem.themeVars.testname).to.equal('testvalue'),
        () => {
          body.removeChild(elem);
          body.removeChild(theme);
        },
        done
      );
    });
  });
});
