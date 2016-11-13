export type blockTypeType = {
  name      : string,
  display   : string,
  schemaName: string,
  level    ?: number,
};

export type blockTypesType = blockTypeType[];

/**
 * This is a list of default block types available for the user to select
 * from a drop-down.
 *
 * Note: Each property corresponds to a context name.
 */
export const blockTypes : any = {
  // Those block types are used when no "context" has been provided.
  "_defaultContext": [{
    name      : 'normalText',
    display   : 'Normal text',
    schemaName: 'paragraph',
  }, {
    name      : 'heading1',
    display   : 'Heading 1',
    schemaName: 'heading',
    level     : 1,
  }, {
    name      : 'heading2',
    display   : 'Heading 2',
    schemaName: 'heading',
    level     : 2,
  }, {
    name      : 'heading3',
    display   : 'Heading 3',
    schemaName: 'heading',
    level     : 3,
  }, {
    name      : 'blockQuote',
    display   : 'Block quote',
    schemaName: 'blockquote',
  }, {
    name      : 'codeBlock',
    display   : 'Code block',
    schemaName: 'code_block',
  }],


  "comment": [{
    name      : 'normalText',
    display   : 'Normal text',
    schemaName: 'paragraph',
  }, {
    name      : 'blockQuote',
    display   : 'Block quote',
    schemaName: 'blockquote',
  }, {
    name      : 'codeBlock',
    display   : 'Code block',
    schemaName: 'code_block',
  }],

  "pr": [{
    name      : 'normalText',
    display   : 'Normal text',
    schemaName: 'paragraph',
  }, {
    name      : 'heading1',
    display   : 'Heading 1',
    schemaName: 'heading',
    level     : 1,
  }, {
    name      : 'heading2',
    display   : 'Heading 2',
    schemaName: 'heading',
    level     : 2,
  }, {
    name      : 'heading3',
    display   : 'Heading 3',
    schemaName: 'heading',
    level     : 3,
  }, {
    name      : 'blockQuote',
    display   : 'Block quote',
    schemaName: 'blockquote',
  }, {
    name      : 'codeBlock',
    display   : 'Code block',
    schemaName: 'code_block',
  }],
};
