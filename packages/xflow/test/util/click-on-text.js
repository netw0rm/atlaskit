// Useful utility for 'integration' style enzyme tests.
// Walks down the react-tree looking for a text node, and simulates a click on it
export default (wrapper, text) => {
  // returns 'true' if a node is a html tag ('div', 'span', 'h1', etc)
  const isHtmlTag = node => typeof node.type() === 'string';

  // find the lowest html tagged node in the tree to simulate the click on
  // this will ensure that any click handlers above the text are triggered.
  wrapper
    .findWhere(node => isHtmlTag(node) && node.text().includes(text))
    .last()
    .simulate('click');
};
