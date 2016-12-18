/// <reference path="./types/prosemirror.d.ts" />
/// <reference path="./types/browserkeymap.d.ts" />

export { default as Keymap } from 'browserkeymap';

export {
  Attribute,
  Block,
  Fragment,
  Inline,
  Mark,
  Node,
  NodeType,
  MarkType,
  ResolvedPos,
  NodeRange,
  Slice,
  Schema,
  Text,
} from 'prosemirror/dist/model';

export {
  TextNode
} from 'prosemirror/dist/model/node';

export {
  commands,
  MarkedRange,
  NodeSelection,
  Plugin,
  ProseMirror,
  Selection,
  TextSelection,
} from 'prosemirror/dist/edit';

export {
  EditorTransform,
} from 'prosemirror/dist/edit/transform';

export {
  RemoveMarkStep,
  ReplaceStep,
  Step
} from 'prosemirror/dist/transform';

export {
  DOMFromPos
} from 'prosemirror/dist/edit/dompos';

export {
  UpdateScheduler,
} from 'prosemirror/dist/edit/update';

export {
  inputRules,
  InputRule,
  allInputRules,
  headingRule,
  bulletListRule,
  blockQuoteRule,
  codeBlockRule,
  wrappingInputRule
} from 'prosemirror/dist/inputrules';

export {
  Transform,
  liftTarget,
  joinPoint
} from 'prosemirror/dist/transform';

export {
  schema,
  Doc,
  BlockQuote,
  OrderedList,
  BulletList,
  ListItem,
  HorizontalRule,
  Heading,
  Paragraph,
  Image,
  HardBreak,
  EmMark,
  StrongMark,
  LinkMark,
  CodeMark,
} from 'prosemirror/dist/schema-basic';

export {
  MarkdownParser,
  MarkdownSerializer,
  MarkdownSerializerState
} from 'prosemirror/dist/markdown';

import * as browser from "prosemirror/dist/util/browser";
export { browser }

export { OrderedMap } from "prosemirror/dist/util/orderedmap";

export { posFromDOM } from 'prosemirror/dist/edit/dompos';
