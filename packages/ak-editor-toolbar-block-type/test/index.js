import { name } from '../package.json';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import Component from '../src';

chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect;

describe(name, () => {
  it('should be possible to create a component', () => {
    const component = new Component();
    expect(component.tagName).to.match(new RegExp(`^${name}`, 'i'));
  });

  it('should have default context as document', () => {
    const component = new Component();
    expect(component.context).to.equal(window.document);
  });

  it('should change context to other div', () => {
    const component = new Component();

    const div = document.createElement('div');
    component.context = div;

    expect(component.context).to.equal(div);
  });
});
