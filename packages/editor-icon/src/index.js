import { define, vdom, prop } from 'skatejs';
import shadowStyles from './shadow.less';
import headStyles from 'style!./host.less'; // eslint-disable-line import/no-unresolved, no-unused-vars, max-len
import icons from './pack-svgs!./'; // eslint-disable-line import/no-unresolved

// Because we dynamically write a CSS style for the fill colour, and we're
// dealing with polyfill'd shadow DOM that doesn't enforce CSS boundaries, we
// need to use a unique class name as the target.
const uniqueId = (() => {
  let counter = 0;
  return () => `editor-icon-unique-id-${counter++}`;
})();

export default define('editor-icon', {
  render: (elem) => {
    const Icon = elem.glyph ? icons[elem.glyph](vdom) : () => {};
    const id = uniqueId();
    return (
      <div className={`${shadowStyles.locals.root} ${id}`}>
        <style>{shadowStyles.toString()}</style>
        <style>{elem.fill && `.${id} path { fill: ${elem.fill}; }`}</style>
        <Icon />
      </div>
    );
  },
  props: {
    glyph: prop.string({ attribute: true, default: null }),
    fill: prop.string({ attribute: true, default: null }),
  },
});
