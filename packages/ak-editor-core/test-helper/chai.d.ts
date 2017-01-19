declare namespace Chai {
  // Unfortunately it's not possible to use the types from ProseMirror to
  // augment namespace definitions.
  //
  // See:
  // - https://github.com/Microsoft/TypeScript/issues/4166
  // - https://github.com/Microsoft/TypeScript/pull/6213
  type NodeTypeCtor = new (...args: any[]) => any;

  interface Assertion {
    nodeType(nodeType: NodeTypeCtor): Assertion;
    textWithMarks(text: string, marks: any[]): Assertion;
  }
}
