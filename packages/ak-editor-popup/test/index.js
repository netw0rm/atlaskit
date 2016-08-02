import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { symbols } from 'skatejs';
import AkEditorPopup from '../src/index.js';

chai.use(chaiAsPromised);
chai.should();


describe('ak-editor-popup', () => {
  it('should be possible to create a component', () => {
    const component = new AkEditorPopup();
    component[symbols.shadowRoot].innerHTML.should.match(/ak-layer/);
  });
});
