import 'style!./host.less';
import { prop, vdom, define } from 'skatejs';
import shadowStyles from './shadow.less';
import classNames from 'classnames';
import Navigation, { events as navigationEvents } from 'ak-navigation';
const { open: navigationOpenEvent, close: navigationCloseEvent } = navigationEvents;

export default define('ak-page', {
  render(elem) {
    return (
      // JSX requires that there only be a single root element.
      // Incremental DOM doesn't require this.
      <div
        className={classNames({
          [shadowStyles.locals.navigationOpen]: elem.navigationOpen,
        })}
      >
        {/* This is required for elements in the shadow root to be styled.
           This is wrapped in the <div /> because you can't have more than one
           root element.
        */}
        <style>{shadowStyles.toString()}</style>
        <div className={shadowStyles.locals.navigation}>

        </div>
        <div className={shadowStyles.locals.main}>
          <div className={shadowStyles.locals.mainFixed}>
            <slot />
          </div>
        </div>
      </div>
    );
  },
  props: {
    navigationOpen: prop.boolean({
      attribute: true,
    }),
  },
  created(elem) {
    elem.addEventListener(navigationOpenEvent, (e) => {
      if (e.target instanceof Navigation) {
        elem.navigationOpen = true;
      }
    });
    elem.addEventListener(navigationCloseEvent, (e) => {
      if (e.target instanceof Navigation) {
        elem.navigationOpen = false;
      }
    });
  },
});
