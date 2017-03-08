const model = require('prosemirror-model');

model.ResolvedPos.prototype.marks = function getMarks(after) {
  const parent = this.parent;
  const index = this.index();

  // In an empty parent, return the empty array
  if (parent.content.size === 0) {
    return model.Mark.none;
  }

  // When at the start of the parent node, return the node's marks
  if ((after && this.textOffset && index < parent.childCount) || this.textOffset) {
    return parent.child(index).marks;
  }
  // When inside a text node, return the node's marks, factoring inclusiveLeft property of the marks
  if (index === 0) {
    return parent.child(index).marks.filter(mark => !!mark.type.spec.inclusiveLeft);
  }

  let marks = parent.child(index - 1).marks;
  for (let i = 0; i < marks.length; i++) {
    if (marks[i].type.spec.inclusiveRight === false) {
      marks = marks[i--].removeFromSet(marks);
    }
  }
  return marks;
};

Object.assign(exports, model);
