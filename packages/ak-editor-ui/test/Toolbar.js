import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import Component from '../src/Toolbar';


chai.use(chaiAsPromised);
chai.should();
const { expect } = chai;

describe('ak-editor-ui Toolbar', () => {
  it('should be possible to create a component', () => {
    const component = new Component();
    expect(component.tagName).to.match(new RegExp('^ak-editor-ui-toolbar', 'i'));
  });
});
