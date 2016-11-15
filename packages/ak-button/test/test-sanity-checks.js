import chai from 'chai';
import { tearDownComponent } from 'akutil-common-test';

import { name } from '../package.json';
import AkButton from '../src';
import { getShadowButtonElem, setup } from './_helpers';


const expect = chai.expect;

describe.skip('sanity-check', () => {
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
});
