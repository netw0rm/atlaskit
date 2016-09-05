import 'style!./host.less';
import classNames from 'classnames';
import { vdom, define, prop } from 'skatejs';
import Layer from 'ak-layer';
import shadowStyles from './shadow.less';

const defaultTooltipPosition = 'bottom';


function positionToPopperPosition(position) {
  const allowedPostions = {
    top: 'top center',
    bottom: 'bottom center',
    left: 'left middle',
    right: 'right middle',
  };
  if (allowedPostions[position]) {
    return allowedPostions[position];
  }
  return allowedPostions[defaultTooltipPosition];
}

function getAnimationClass(position) {
  const animationMapping = {
    top: shadowStyles.locals.slideUpAnimation,
    bottom: shadowStyles.locals.slideDownAnimation,
    left: shadowStyles.locals.slideLeftAnimation,
    right: shadowStyles.locals.slideRightAnimation,
  };

  return animationMapping[position] ? animationMapping[position] : undefined;
}

/**
 * @description Create instances of the component programmatically, or using markup.
 * @class Tooltip
 * @example @html <ak-tooltip id='myTooltip'></ak-tooltip>
 * @example @js import Tooltip from 'ak-tooltip';
 * const component = new Tooltip();
 * component.id = 'myTooltip';'
 */
export default define('ak-tooltip', {
  render(elem) {
    const messageBoxClasses = classNames({
      [shadowStyles.locals.tooltip]: true,
      [getAnimationClass(elem.position)]: elem.isShown,
    });
    const layerClasses = classNames({
      [shadowStyles.locals.hidden]: !elem.isShown,
    });
    return (
      <div>
        <Layer
          target={elem.target}
          position={positionToPopperPosition(elem.position)}
          className={layerClasses}
          ref={(ref) => (elem.layer = ref)}
          enableFlip="true"
          style={{ pointerEvents: 'none' }}
        >
          <style>{shadowStyles.toString()}</style>
          <div className={messageBoxClasses}>{elem.description}</div>
        </Layer>
      </div>
    );
  },
  attached(elem) {
    const id = elem.id;
    if (!id) {
      return;
    }
  },
  prototype: {
    /**
     * @description Causes an ak-tooltip to become visible and positioned to whichever element it
     * is bound to. This is normally called by an ak-tooltip-trigger
     * @memberof Tooltip
     * @function
     * @instance
     * @param {node} elem The element to bind a tooltip to.
     * @param {string} description The text to display in the tooltip.
     * @param {string} position The position (relative to elem) the tooltip should be shown.
     * Allowed values: top, bottom, left, right.
     * @return undefined
     * @example @js component.show(helpButton, 'Show help menu', 'bottom');
    */
    show(elem, description, position) {
      this.position = position;
      this.description = description;
      this.target = elem;
      this.isShown = true;
    },
    /**
     * @description Causes an ak-tooltip to no longer be visible.
     * This is normally fired from an ak-tooltip-trigger.
     * @memberof Tooltip
     * @function
     * @instance
     * @return undefined
     * @example @js component.hide();
    */
    hide() {
      this.isShown = false;
    },
  },
  props: {
    /**
     * @description The location of where the tooltip will appear, relative to the component it
     * is bound to. Usually this would be set by an ak-tooltip-trigger.
     * Allowed values: top, bottom, left and right.
     * @memberof Tooltip
     * @instance
     * @type {string}
     * @default bottom
    */
    position: {
      default: defaultTooltipPosition,
      attribute: true,
      set(elem) {
        if (elem.layer) {
          elem.layer.reposition();
        }
      },
    },
    /**
     * @description Either an id or a reference to an element that the tooltip is bound to.
     * This is usually set by an ak-tooltip-trigger.
     * @memberof Tooltip
     * @instance
     * @type {string|Node}
     * @default none
    */
    target: {
      attribute: true,
    },
    /**
     * @description The text to display in the tooltip when a user hovers or focuses on the
     * wrapped element.
     * This is normally set by an ak-tooltip-trigger.
     * @memberof Tooltip
     * @instance
     * @type {string}
     * @default none
    */
    description: {
      attribute: true,
    },
    isShown: prop.boolean(),
    animating: prop.boolean(),
  },
});
