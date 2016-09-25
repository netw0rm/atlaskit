import { vdom, prop } from 'skatejs';
import shadowGroupStyles from './less/shadow-group.less';

export default {
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
};
