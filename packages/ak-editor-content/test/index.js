import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import AkEditorContent from '../src';
import { name } from '../package.json';

chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect;

describe('ak-editor-content', () => {
  it('should be possible to create a component', () => {
    let component;
    expect(() => {
      component = new AkEditorContent();
    }).not.to.throw(Error);
    expect(component.getAttribute('defined')).not.to.equal(null);
    expect(component.tagName.toLowerCase()).to.equal(name);
  });
});
