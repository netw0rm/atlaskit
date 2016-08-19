import { name } from '../package.json';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
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
    ['save', 'cancel'].forEach((action) => {
      it(`should trigger ${action} event`, () => {
        let clicked = false;
        const component = new Component();
        const button = component.querySelector(shadowStyles.locals[`${action}Button`]);
        const event = new CustomEvent('click', {});
        component.addEventListener('click', () => {
          clicked = true;
        });
        button.emit(event);
        expect(clicked).to.equal(true);
      });
    });
  });

  describe('insert events', () => {
    ['mention', 'image'].forEach((insertName) => {
      it(`should trigger ${insertName} event`, () => {
        let clicked = false;
        const component = new Component();
        const insert = component.querySelector(insertName);
        const event = new CustomEvent('click', {});
        component.addEventListener('click', () => {
          clicked = true;
        });
        insert.emit(event);
        expect(clicked).to.equal(true);
      });
    });
  });
});
