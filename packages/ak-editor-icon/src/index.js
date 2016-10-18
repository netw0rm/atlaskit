import { define, vdom, prop } from 'skatejs';
import uid from 'uid';

import 'style!./host.less';

import shadowStyles from './shadow.less';
import icons from './pack-svgs!./';


export default define('ak-editor-icon', {
  render: (elem) => {
    const Icon = elem.glyph ? icons[elem.glyph](vdom) : () => {};
    // Because we dynamically write a CSS style for the fill colour, and we're
    // dealing with polyfill'd shadow DOM that doesn't enforce CSS boundaries, we
    // need to use a unique class name as the target.
    const id = `i-${uid()}`;
    return (
      <div className={`${shadowStyles.locals.root} ${id}`}>
        <style>{shadowStyles.toString()}</style>
        <style>{elem.fill && `.${id} path { fill: ${elem.fill}; }`}</style>
        <Icon />
      </div>
    );
  },
  props: {
    glyph: prop.string({ attribute: true }),
    fill: prop.string({ attribute: true }),
  },
});
