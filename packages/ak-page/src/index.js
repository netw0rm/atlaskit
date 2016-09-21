import 'style!./host.less';
import { prop, vdom, define } from 'skatejs';
import shadowStyles from './shadow.less';
import classNames from 'classnames';
import Navigation, { events as navigationEvents } from 'ak-navigation';
const {
  widthChanged: widthChangedEvent,
} = navigationEvents;

function handleWidthChanged(e, elem) {
  if (e.target instanceof Navigation) {
    elem.navigationWidth = e.detail.width;
  }
}

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
        <style>{`
            .${shadowStyles.locals.main} {
              margin-left: ${elem.navigationWidth + 20}px;
            }
          `}</style>
        <div className={shadowStyles.locals.navigation}>
          <slot name="navigation" />
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
    navigationWidth: prop.number({
      attribute: true,
      default: 280,
    }),
  },
  created(elem) {
    elem.addEventListener(widthChangedEvent, (e) => handleWidthChanged(e, elem));
  },
});
