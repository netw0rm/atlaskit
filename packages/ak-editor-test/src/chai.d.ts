/// <reference path="../../ak-editor-prosemirror/src/prosemirror.d.ts" />

declare namespace Chai {
  import { NodeType } from 'ak-editor-prosemirror';
  interface Assertion {
    nodeType(nodeType: NodeType): Assertion;
    mark(mark: string): Assertion;
    marks(marks: string[]): Assertion;
  }
}
