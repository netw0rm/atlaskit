import { name } from '../package.json';
import chai from 'chai';
import AkButton, { themes } from '../src';
import { getShadowButtonElem, setup } from './_helpers';
import { tearDownComponent } from 'akutil-common-test';

const expect = chai.expect;
const Adg2Theme = themes.adg2;

describe('sanity-check', () => {
  let component;

  describe('ak-button/component', () => {
    beforeEach(() => setup().then(c => (component = c)));
    afterEach(() => tearDownComponent(component));

    it('should not throws when component is instanciated', () =>
      expect(() => (new AkButton())).not.to.throw(Error)
    );

    it('should be possible to create a component', () => {
      expect(getShadowButtonElem(component)).to.be.defined;
      expect(component.tagName).to.match(new RegExp(`^${name}`, 'i'));
    });
  });

  describe('ak-button/adg2-theme-sanity-check', () => {
    it('should be possible to create a component', () =>
      expect(() => (new Adg2Theme())).to.not.throw(Error)
    );
  });
});
