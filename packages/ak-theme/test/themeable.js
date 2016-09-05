import { themeable } from '../src';
import { define, emit } from 'skatejs';
import { afterMutations } from 'akutil-common-test';
import themes, { themeNameFromNode } from '../src/themes';

function eventName(elem) {
  return `ak-theme-${themeNameFromNode(elem)}`;
}

describe('ak-theme, { themeable }', () => {
  let elem;

  beforeEach(done => {
    elem = new (define('x-test', themeable({})));
    document.body.appendChild(elem);
    afterMutations(done);
  });

  afterEach(done => {
    document.body.removeChild(elem);
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

      it('should have a listener bound on initialisation', () => {
        // To check if listeners were added / removed on initialisation, we need
        // to create a themeable element *after* the spies are created.
        const elemAfterSpies = document.createElement(themeNameFromNode(elem));

        expect(spyAddEventListener.callCount).to.equal(1);
        expect(spyAddEventListener.getCall(0).args[0]).to.equal(eventName(elemAfterSpies));

        expect(spyRemoveEventListener.callCount).to.equal(0);
      });

      it('should add listener for new theme and remove listener for old theme', () => {
        elem.themeName = 'newval1';

        expect(spyAddEventListener.callCount).to.equal(1);
        expect(spyAddEventListener.getCall(0).args[0]).to.equal('ak-theme-newval1');

        expect(spyRemoveEventListener.callCount).to.equal(1);
        expect(spyRemoveEventListener.getCall(0).args[0]).to.equal(eventName(elem));
      });

      it('should not add / remove listeners if the value does not change', () => {
        elem.themeName = themeNameFromNode(elem);
        expect(spyAddEventListener.callCount).to.equal(0);
        expect(spyRemoveEventListener.callCount).to.equal(0);
      });

      it('should not add a listener if the value is falsy, but should remove the old value', () => {
        elem.themeName = '';

        expect(spyAddEventListener.callCount).to.equal(0);

        expect(spyRemoveEventListener.callCount).to.equal(1);
        expect(spyRemoveEventListener.getCall(0).args[0]).to.equal(eventName(elem));
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

    it('should be an empty object if no theme exists', () => {
      expect(Object.keys(elem.themeVars).length).to.equal(0);
    });

    it('should contain the current theme vars if it exists', () => {
      themes[themeNameFromNode(elem)] = { test: true };
      const elemAfterTheme = document.createElement(themeNameFromNode(elem));
      expect(elemAfterTheme.themeVars.test).to.equal(true);
    });

    it('should update when the event is triggered', () => {
      themes[themeNameFromNode(elem)] = { test: true };
      emit(document, eventName(elem));
      expect(elem.themeVars.test).to.equal(true);
    });

    it('should update when the themeName is changed', () => {
      themes.test = { test: true };
      elem.themeName = 'test';
      expect(elem.themeVars.test).to.equal(true);
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
