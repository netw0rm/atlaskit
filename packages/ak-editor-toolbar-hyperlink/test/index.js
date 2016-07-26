import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { symbols } from 'skatejs';
import AkEditorToolbarHyperlink from '../src/index.js';

chai.use(chaiAsPromised);
chai.should();


describe('ak-editor-toolbar-hyperlink', () => {
  it('should be possible to create a component', () => {
    const component = new AkEditorToolbarHyperlink();
    component[symbols.shadowRoot].innerHTML.should.match(/ak-editor-button/);
  });
});
