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
    ['save', 'cancel'].forEach((buttonName) => {
      it(`should trigger ${buttonName} event`, () => {
        let clicked = false;
        const component = new Component();
        const button = component.querySelector(shadowStyles.locals[`${buttonName}Button`]);
        const event = new CustomEvent('click', {});
        component.addEventListener('click', () => {
          clicked = true;
        });
        button.emit(event);
        expect(clicked).to.equal(true);
      });
    });
  });

  describe('tool events', () => {
    ['mention', 'image'].forEach((toolName) => {
      it(`should trigger ${toolName} event`, () => {
        let clicked = false;
        const component = new Component();
        const tool = component.querySelector(toolName);
        const event = new CustomEvent('click', {});
        component.addEventListener('click', () => {
          clicked = true;
        });
        tool.emit(event);
        expect(clicked).to.equal(true);
      });
    });
  });
});
