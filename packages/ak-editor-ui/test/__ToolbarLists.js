import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import Component from '../src/ToolbarLists';

chai.use(chaiAsPromised);
chai.should();
const { expect } = chai;

describe('ak-editor-ui ToolbarLists', () => {
  it('should be possible to create a component', () => {
    const component = new Component();
    expect(component.tagName).to.match(new RegExp('^ak-editor-ui-toolbar-lists', 'i'));
  });
});
