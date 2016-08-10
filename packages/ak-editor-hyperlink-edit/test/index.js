import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import AkEditorHyperlinkEdit from '../src';
import { name } from '../package.json';

chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect;

describe('ak-editor-hyperlink-edit', () => {
  it('should be possible to create a component', () => {
    let component;
    expect(() => {
      component = new AkEditorHyperlinkEdit();
    }).not.to.throw(Error);
    expect(component.tagName.toLowerCase()).to.equal(name);
  });
});
