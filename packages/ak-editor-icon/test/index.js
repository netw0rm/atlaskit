import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import AkEditorIcon from '../src';
import { name } from '../package.json';

chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect;

describe('ak-editor-icon', () => {
  it('should be possible to create a component', () => {
    let component;
    expect(() => {
      component = new AkEditorIcon();
    }).not.to.throw(Error);
    expect(component.getAttribute('defined')).not.to.equal(null);
    expect(component.tagName.toLowerCase()).to.equal(name);
  });
});
