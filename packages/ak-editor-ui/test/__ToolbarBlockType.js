import * as chai from 'chai';
import { fixtures } from 'ak-editor-test';
import { afterMutations } from 'akutil-common-test';
import ToolbarBlockType from '../src/ToolbarBlockType';
import ToolbarBlockTypeSelect from '../src/ToolbarBlockType/Select';

const { expect } = chai;

describe.skip('ak-editor-ui ToolbarBlockType', () => {
  const fixture = fixtures();

  it('should be possible to create a component', () => {
    const component = new ToolbarBlockType();
    expect(component.tagName).to.match(new RegExp('^ak-editor-ui-toolbar-block-type', 'i'));
  });

  it('should always be the same width', (done) => {
    const blockTypeSelect = fixture().appendChild(new ToolbarBlockTypeSelect());

    afterMutations(
      () => {
        const buttonSpan = blockTypeSelect.shadowRoot.querySelector('span');
        const width = window.getComputedStyle(buttonSpan).width;
        expect(width).to.equal('80px');
      },
      done
    );
  });
});
