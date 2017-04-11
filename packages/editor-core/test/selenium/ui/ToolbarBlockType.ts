import editor from '../../../src/test-helper/page-object';

describe('Editor Core -> UI -> ToolbarBlockType', () => {
  beforeEach(() => {
    return browser
      .url('/iframe.html?selectedKind=%40atlaskit%2Feditor-core&selectedStory=Example%20editor')
      .click(editor.collapsed)
      .waitForVisible(editor.expanded);
  });

  it('click on toolbar button should open droplist', () => {
    return browser
      .click(editor.toolbarBlockType.button)
      .waitForVisible(editor.toolbarBlockType.droplist);
  });

  it('should change paragraph to heading choosing coresponding droplist item', () => {
    return browser
      // Heading 1
      .click(editor.toolbarBlockType.button)
      .waitForVisible(editor.toolbarBlockType.droplist)
      .click(editor.toolbarBlockType.heading1)
      .waitForVisible(`${editor.content} > h1`)

      // Heading 2
      .click(editor.toolbarBlockType.button)
      .waitForVisible(editor.toolbarBlockType.droplist)
      .click(editor.toolbarBlockType.heading2)
      .waitForVisible(`${editor.content} > h2`);
  });
});
