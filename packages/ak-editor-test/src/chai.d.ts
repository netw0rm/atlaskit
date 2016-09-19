/// <reference path="../../ak-editor-prosemirror/src/prosemirror.d.ts" />

declare namespace Chai {
  import { NodeType, Mark } from 'ak-editor-prosemirror';
  interface Assertion {
    nodeType(nodeType: NodeType): Assertion;
    textWithMarks(text: string, marks: Mark[]): Assertion;
  }
}
