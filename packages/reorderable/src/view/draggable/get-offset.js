// @flow

const supported = ['CSSMatrix', 'WebKitCSSMatrix', 'MSCSSMatrix']
  .find(option => typeof window[option] !== 'undefined');

export default (node: Node): Position => {
  const transform = new window[supported](window.getComputedStyle(node).webkitTransform);

  const offset: Position = {
    x: transform.m41,
    y: transform.m42,
  };

  return offset;
};
