import { define, vdom, prop } from 'skatejs';
import shadowStyles from './shadow.less';
import headStyles from 'style!./host.less';
import icons from "./pack-svgs!./";

export default define('editor-icon', {
  render: (elem) => {
    const Icon = elem.glyph ? icons[elem.glyph](vdom) : () => {};
    return (
      <div className={shadowStyles.locals.root}>
        <style>{shadowStyles.toString()}</style>
        <style>{elem.fill &&
`.${shadowStyles.locals.root} path {
 fill: ${elem.fill};
}`}</style>
        <Icon></Icon>
      </div>
    );
  },
  props: {
    glyph: prop.string({ attribute: true, default: null}),
    fill: prop.string({ attribute: true, default: null}),
  }
});
