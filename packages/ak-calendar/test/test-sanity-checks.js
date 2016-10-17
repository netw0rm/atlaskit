import { name } from '../package.json';
import chai from 'chai';
import Component from '../src';
import { setupComponent, tearDownComponent } from './_helpers';
import { getShadowRoot } from 'akutil-common-test';

const expect = chai.expect;

describe('sanity-check', () => {
  let component;

  describe('ak-calendar/sanity-check', () => {
    beforeEach(() => setupComponent(Component).then(c => (component = c)));
    afterEach(() => tearDownComponent(component));

    it('should not throws when component is instanciated', () =>
      expect(() => (new Component())).not.to.throw(Error)
    );

    it('should be possible to create a component', () => {
      expect(getShadowRoot(component)).to.be.defined;
      expect(component.tagName).to.match(new RegExp(`^${name}`, 'i'));
    });
  });
});
