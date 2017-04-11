import editor from '../../src/test-helper/page-object';

describe('Editor Core -> Base', () => {
  beforeEach(() => {
    return browser
      .url('/iframe.html?selectedKind=%40atlaskit%2Feditor-core&selectedStory=Example%20editor');
  });

  it('should render collapsed editor', () => {
    return browser
      .waitForVisible(editor.collapsed);
  });

  it('should expand the editor after clicking on collapsed', () => {
    return browser
      .waitForVisible(editor.collapsed)
      .click(editor.collapsed)
      .waitForVisible(editor.expanded);
  });
});
