import { vdom, prop } from 'skatejs';
import shadowGroupStyles from './shadow-group.less';

export default {
  render(elem) {
    return (
      <div className={shadowGroupStyles.locals.group}>
        <style>{shadowGroupStyles.toString()}</style>
        {elem.title ? <h4 className={shadowGroupStyles.locals.title}>{elem.title}</h4> : null}
        <slot />
      </div>
    );
  },
  props: {
    title: prop.string({
      attribute: true,
    }),
  },
};
