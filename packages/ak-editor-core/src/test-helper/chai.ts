/// <reference path="./chai.d.ts"/>
import { Fragment, Node, Mark, Text, Slice, NodeType } from 'ak-editor-prosemirror';

function isNodeOrFragment(thing: any): thing is Node | Fragment {
  // Using a simple `instanceof` check is intentionally avoided here to make
  // this code agnostic to a specific instance of a Schema.
  return thing && typeof thing.eq === 'function';
}

function isSlice(thing: any): thing is Slice {
  return typeof thing.openLeft === 'number' &&
    typeof thing.openRight === 'number' &&
    isNodeOrFragment(thing.content);
}

export default (chai: any) => {
  const { Assertion, util } = chai;

  // Node and Fragment
  Assertion.overwriteMethod('equal', (_super: Function) => {
    return function (right: any) {
      const left: any = this._obj;
      const deep = util.flag(this, 'deep');
      if (deep && isNodeOrFragment(left) && isNodeOrFragment(right)) {
        this.assert(left.eq(right),
          "expected #{exp} to equal #{act}",
          "expected #{exp} to not equal #{act}",
          left.toString(),
          right.toString())
      } else {
        _super.apply(this, arguments);
      }
    };
  });

  // Slice
  Assertion.overwriteMethod('equal', (_super: Function) => {
    return function (right: any) {
      const left: any = this._obj;
      const deep = util.flag(this, 'deep');
      if (deep && isSlice(left) && isSlice(right)) {
        this.assert(left.content.eq(right.content),
          "expected left's fragment #{exp} to equal right's fragment #{act}",
          "expected left's fragment #{exp} to not equal right's fragment #{act}",
          left.content.toString(),
          right.content.toString());
        this.assert(left.openLeft === right.openLeft,
          "expected left's openLeft #{exp} to equal right's openLeft #{act}",
          "expected left's openLeft #{exp} to not equal right's openLeft #{act}",
          left.openLeft,
          right.openLeft);
        this.assert(left.openRight === right.openRight,
          "expected left's openRight #{exp} to equal right's openRight #{act}",
          "expected left's openRight #{exp} to not equal right's openRight #{act}",
          left.openRight,
          right.openRight);
      } else {
        _super.apply(this, arguments);
      }
    };
  });

  Assertion.addMethod('nodeType', function(nodeType: NodeType) {
    const obj: Node = util.flag(this, 'object');
    const negate: boolean = util.flag(this, 'negate');

    if (negate) {
      return new Assertion(obj.type).not.to.be.an.instanceof(nodeType);
    }
    return new Assertion(obj.type).to.be.an.instanceof(nodeType);
  });

  Assertion.addMethod('textWithMarks', function(text: string, marks: Mark[] ) {
    const obj: Node = util.flag(this, 'object');
    const negate: boolean = util.flag(this, 'negate');

    let matched = false;
    obj.descendants((node: Node, pos: number) => {
      if (node.isText && node.text === text) {
        if (Mark.sameSet(node.marks, marks)) {
          matched = true;
        }
      }
    });

    if (negate) {
      return new Assertion(matched).not.to.be.true;
    }
    return new Assertion(matched).to.be.true;
  });
}
