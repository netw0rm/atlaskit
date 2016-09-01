import { themeable } from '../src';
// import themes from '../src/themes';

describe('ak-theme, { themeable }', () => {
  let opts;

  beforeEach(() => {
    opts = { props: {} };
  });

  describe('themeName', () => {
    it('should define an object', () => {
      const def = themeable(opts);
      expect(def.props.themeName).to.be.an('object');
    });

    it('should override existing themeName', () => {
      opts.props.themeName = {};
      const def = themeable(opts);
      expect(def.props.themeName).to.not.equal(def);
    });

    it('should be an attribute', () => {
      const def = themeable(opts);
      expect(def.props.themeName.attribute).to.equal(true);
    });

    it('should have an initial value of the tag name', () => {
      const def = themeable(opts);
      const div = document.createElement('div');
      expect(def.props.themeName.initial(div)).to.equal('div');
    });

    describe('listeners', () => {
      // let def;
      // let div;

      beforeEach(() => {
        // def = themeable(opts);
        // div = document.createElement('div');
      });

      it('should add an event that listens for the new theme', () => {

      });

      it('should not double up on event listeners', () => {

      });

      it('should remove the old event listener and add a new one', () => {

      });

      it('should remove the old event listener and not add a new one', () => {

      });
    });
  });

  describe('themeVars', () => {
    it('should define an object', () => {
      const def = themeable(opts);
      expect(def.props.themeName).to.be.an('object');
    });

    it('should override existing themeVars', () => {
      opts.props.themeVars = {};
      const def = themeable(opts);
      expect(def.props.themeVars).to.not.equal(def);
    });
  });
});
