/** @jsx vdom */
import { prop, vdom, define, emit } from 'skatejs';
import classNames from 'classnames';

import shadowStyles from './shadow.less';
import * as events from './internal/index.events';

function handleActivation(elem) {
  return () => {
    if (elem.clickable) {
      emit(elem, events.activate);
    }
  };
}

/**
 * @description Create instances of the component programmatically, or using markup.
 * @class Blanket
 * @example @js import Blanket from 'ak-blanket';
 * const component = new Blanket();
 */
export default define('ak-blanket', {
  render(elem) {
    const classes = classNames(
      [shadowStyles.locals.blanket, { [`${shadowStyles.locals.tinted}`]: elem.tinted }]
    );

    // TODO make sure that the div onclick is accessible
    return (
      <div>
        <style>{shadowStyles.toString()}</style>
        <div // eslint-disable-line jsx-a11y/no-static-element-interactions
          onClick={handleActivation(elem)}
          onTouch={handleActivation(elem)}
          className={classes}
        />
      </div>
    );
  },
  props: {
    /**
     * @description Is blanket grey with opacity or transparent. By default it's transparent.
     * @memberof Blanket
     * @instance
     * @type Boolean
     * @default false
     * @example @html <ak-blanket tinted></ak-blanket>
     * @example @js component.tinted = true
     */
    tinted: prop.boolean({ attribute: true }),
    /**
     * @description Whether the blanket is clickable.
     *
     * @memberof Blanket
     * @instance
     * @emits Blanket#activate
     * @type Boolean
     * @default false
     * @example @html <ak-blanket clickable></ak-blanket>
     * @example @js component.clickable = true
     */
    clickable: prop.boolean({ attribute: true }),
  },
});

export { events };
