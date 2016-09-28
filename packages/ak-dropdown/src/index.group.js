import { vdom, prop, define } from 'skatejs';
import shadowGroupStyles from './less/shadow-group.less';

export default define('ak-dropdown-group', {
  render(elem) {
    return (
      <div className={shadowGroupStyles.locals.group}>
        <style>{shadowGroupStyles.toString()}</style>
        {elem.heading ? <h4 className={shadowGroupStyles.locals.heading}>{elem.heading}</h4> : null}
        <slot />
      </div>
    );
  },
  props: {
    heading: prop.string({
      attribute: true,
    }),
  },
});
