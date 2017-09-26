import { expect } from 'chai';
import textFormattingPlugin from '../../../../../src/editor/plugins/text-formatting';

describe('@atlaskit/editor-core/editor/plugins/emojiPlugin', () => {

  it('should have primaryToolbarComp defined', () => {
    expect(textFormattingPlugin.primaryToolbarComponent).to.not.equal(undefined);
  });
});
