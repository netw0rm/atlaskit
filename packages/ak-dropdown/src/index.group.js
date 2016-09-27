import { vdom, prop } from 'skatejs';
import shadowGroupStyles from './less/shadow-group.less';

export default {
  render(elem) {
    return (
      <div
        className={shadowGroupStyles.locals.group}
        role="group"
        aria-label={elem.heading}
      >
        <style>{shadowGroupStyles.toString()}</style>
        {elem.heading ?
          <div
            className={shadowGroupStyles.locals.heading}
            aria-hidden="true"
          >
              {elem.heading}
          </div> : null}
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
