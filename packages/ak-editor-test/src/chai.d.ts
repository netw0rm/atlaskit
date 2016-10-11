/// <reference path="../../ak-editor-prosemirror/src/prosemirror.d.ts" />

declare namespace Chai {
  import { NodeType, Mark } from 'prosemirror/dist/model';
  type NodeTypeCtor = new (...args: any[]) => NodeType;

  interface Assertion {
    nodeType(nodeType: NodeTypeCtor): Assertion;
    textWithMarks(text: string, marks: Mark[]): Assertion;
  }
}
