/** @jsx vdom */
import { prop, vdom, define, emit } from 'skatejs';
import shadowStyles from './shadow.less';
import classNames from 'classnames';
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

    return (
      <div>
        <style>{shadowStyles.toString()}</style>
        <div
          onClick={handleActivation(elem)}
          onTouch={handleActivation(elem)}
          className={classes}
        >
        </div>
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
