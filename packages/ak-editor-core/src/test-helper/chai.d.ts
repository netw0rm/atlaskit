declare namespace Chai {
  import { NodeType, Mark } from '../prosemirror';
  type NodeTypeCtor = new (...args: any[]) => NodeType;

  interface Assertion {
    nodeType(nodeType: NodeTypeCtor): Assertion;
    textWithMarks(text: string, marks: Mark[]): Assertion;
  }
}
