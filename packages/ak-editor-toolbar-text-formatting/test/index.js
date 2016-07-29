import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import AkEditorToolbarTextFormatting from '../src';
import { name } from '../package.json';

chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect;

describe('ak-editor-toolbar-text-formatting', () => {
  it('should be possible to create a component', () => {
    let component;
    expect(() => {
      component = new AkEditorToolbarTextFormatting();
    }).not.to.throw(Error);
    expect(component.getAttribute('defined')).not.to.equal(null);
    expect(component.tagName.toLowerCase()).to.equal(name);
  });
});
