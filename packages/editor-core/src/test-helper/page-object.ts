export default {
  collapsed: '[class*="editor-chrome-collapsed"]',
  expanded: '[class*="editor-chrome-expanded"]',
  content: '[class*="editor-chrome-expanded"] .ProseMirror',

  toolbarBlockType: {
    button: '[class*="editor-toolbar-blocktype-button"]',
    droplist: '[class*="editor-toolbar-blocktype-droplist"]',
    heading1: '[class*="editor-toolbar-blocktype-droplist"] [role="group"]:nth-child(2) [class*="editor-toolbar-blocktype-droplist-item"]:nth-child(1)',
    heading2: '[class*="editor-toolbar-blocktype-droplist"] [role="group"]:nth-child(2) [class*="editor-toolbar-blocktype-droplist-item"]:nth-child(2)'
  }
};
