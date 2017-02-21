// @flow
import invariant from 'invariant';
import memoizeOne from 'memoize-one';

// todo: check in FF and MS
const getSupportMatrix = memoizeOne(() => ['DOMMatrix', 'WebKitCSSMatrix', 'MSCSSMatrix']
  .find(option => typeof window[option] !== 'undefined'));

const getSupportedTransformProperty = memoizeOne(() => {
  const node = document.createElement('div');
  const style = window.getComputedStyle(node);

  // TODO: add other transformation properties as needed
  return ['transform', 'webkitTransform'].find(option => typeof style[option] !== 'undefined');
});

export default (node: Node): Position => {
  const supportedMatrix = getSupportMatrix();
  invariant(supportedMatrix, 'no supported matrix function found');

  const transformProperty = getSupportedTransformProperty();
  invariant(transformProperty, 'no supported transformation property found');

  const transform = new window[supportedMatrix](window.getComputedStyle(node)[transformProperty]);

  const offset: Position = {
    x: transform.m41,
    y: transform.m42,
  };

  return offset;
};
