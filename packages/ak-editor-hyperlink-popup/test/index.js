import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { symbols } from 'skatejs';
import AkEditorHyperlinkPopup from '../src/index.js';

chai.use(chaiAsPromised);
chai.should();


describe('ak-editor-hyperlink-popup', () => {
  it('should be possible to create a component', () => {
    const component = new AkEditorHyperlinkPopup();
    component[symbols.shadowRoot].innerHTML.should.match(/ak-layer/);
  });
});
