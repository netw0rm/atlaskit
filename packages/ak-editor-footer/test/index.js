import { name } from '../package.json';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { symbols } from 'skatejs';
import Component from '../src';
import shadowStyles from '../src/shadow.less';

chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect;

describe(name, () => {
  it('should be possible to create a component', () => {
    const component = new Component();
    expect(component.tagName.toLowerCase()).to.equal(name);
  });

  describe('button events', () => {
    it('should trigger save event', () => {
      let clicked = false;
      const component = new Component();
      const button = component[symbols.shadowRoot]
        .querySelector(shadowStyles.locals.saveButton);
      const event = new CustomEvent('click', {});
      component.addEventListener('save', () => {
        clicked = true;
      });
      button.emit(event);
      expect(clicked).to.equal(true);
    });

    it('should trigger cancel event', () => {
      let clicked = false;
      const component = new Component();
      const button = component[symbols.shadowRoot]
        .querySelector(shadowStyles.locals.cancelButton);
      const event = new CustomEvent('click', {});
      component.addEventListener('cancel', () => {
        clicked = true;
      });
      button.emit(event);
      expect(clicked).to.equal(true);
    });
  });

  describe('insert events', () => {
    it('should trigger mention event', () => {
      let clicked = false;
      const component = new Component();
      const insert = component[symbols.shadowRoot].querySelectorAll('button')[0];
      const event = new CustomEvent('click', {});
      component.addEventListener('insertmention', () => {
        clicked = true;
      });
      insert.emit(event);
      expect(clicked).to.equal(true);
    });

    it('should trigger image event', () => {
      let clicked = false;
      const component = new Component();
      const insert = component[symbols.shadowRoot].querySelectorAll('button')[1];
      const event = new CustomEvent('click', {});
      component.addEventListener('insertimage', () => {
        clicked = true;
      });
      insert.emit(event);
      expect(clicked).to.equal(true);
    });
  });
});
