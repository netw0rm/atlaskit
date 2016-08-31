import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import Dropdown, * as exports from '../src';
import { symbols, Component } from 'skatejs';
import { name } from '../package.json';

chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect;

describe('ak-dropdown', () => {
  describe('exports', () => {
    it('should export a base component', () => {
      (new Dropdown).should.be.an.instanceof(Component);
    });

    it('should have an sub-components exports', () => {
      (new exports.Item).should.be.an.instanceof(Component);
      (new exports.Trigger).should.be.an.instanceof(Component);
      (new exports.TriggerButton).should.be.an.instanceof(Component);
    });

    it('should have an events export with defined events', () => {
      exports.EVENTS.should.be.defined;
      Object.keys(exports.EVENTS).should.be.deep.equal([
        'SELECTED',
        'ITEM_UP',
        'ITEM_DOWN',
        'ITEM_TAB',
        'TRIGGER_ACTIVATED',
      ]);
    });
  });

  describe('general behavior', () => {
    let component;
    let dropdownContainer;

    beforeEach(() => {
      component = new Dropdown();
      dropdownContainer = document.createElement('div');
      dropdownContainer.appendChild(component);
      document.body.appendChild(dropdownContainer);
    });
    afterEach(() => {
      document.body.removeChild(dropdownContainer);
    });
    it('should be possible to create a component', (done) => {
      // testing to see that skate did its job as expected
      // (in case some breaking changes in it that affect rendering)
      setTimeout(() => {
        expect(component.tagName).to.match(new RegExp(`^${name}`, 'i'));
        expect(component[symbols.shadowRoot]).to.be.defined;
        expect(component[symbols.shadowRoot].firstChild).to.be.defined;
      });
      setTimeout(done);
    });
  });
});
