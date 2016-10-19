import chai from 'chai';
import { getShadowRoot } from 'akutil-common-test';
import { name } from '../package.json';
import Component from '../src';
import DateComponent from '../src/internal/date-component';
import { setupComponent, tearDownComponent } from './_helpers';

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

  describe('ak-calendar-date/sanity-check', () => {
    beforeEach(() => setupComponent(DateComponent).then(c => (component = c)));
    afterEach(() => tearDownComponent(component));

    it('should not throws when component is instanciated', () =>
      expect(() => (new DateComponent())).not.to.throw(Error)
    );

    it('should be possible to create a component', () => {
      expect(getShadowRoot(component)).to.be.defined;
      expect(component.tagName).to.match(new RegExp('^ak-calendar-date', 'i'));
    });
  });
});
