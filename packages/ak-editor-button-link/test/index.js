import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import AkEditorButtonLink from '../src';
import { name } from '../package.json';

chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect;

describe('ak-editor-button-link', () => {
  it('should be possible to create a component', () => {
    let component;
    expect(() => {
      component = new AkEditorButtonLink();
    }).not.to.throw(Error);
    expect(component.tagName.toLowerCase()).to.equal(name);
  });
});
