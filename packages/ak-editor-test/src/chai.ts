import { Fragment, Node, Slice } from 'ak-editor-prosemirror';

export default (chai: any) => {
  const { Assertion, util } = chai;

  // Node
  Assertion.overwriteMethod('equal', (_super: Function) => {
    return function (right: any) {
      const left: any = this._obj;
      const deep = util.flag(this, 'deep');
      if (deep && right instanceof Node) {
        new Assertion(left).instanceOf(Node);
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

  // Fragment
  Assertion.overwriteMethod('equal', (_super: Function) => {
    return function (right: any) {
      const left: any = this._obj;
      const deep = util.flag(this, 'deep');
      if (deep && right instanceof Fragment) {
        new Assertion(left).instanceOf(Fragment);
        this.assert(left.eq(right),
          "expected #{exp} to equal #{act}",
          "expected #{exp} to not equal #{act}",
          left.toString(),
          right.toString());
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
      if (deep && right instanceof Slice) {
        new Assertion(left).instanceOf(Slice);
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
}
