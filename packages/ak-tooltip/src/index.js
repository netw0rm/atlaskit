import 'style!./host.less';
import classNames from 'classnames';
import { vdom, define, prop } from 'skatejs';
import Layer from 'ak-layer';
import shadowStyles from './shadow.less';
import TooltipTrigger from './tooltip-trigger';

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

function getAnimationClass(elem, position) {
  const animationMapping = {
    top: shadowStyles.locals.slideUpAnimation,
    bottom: shadowStyles.locals.slideDownAnimation,
    left: shadowStyles.locals.slideLeftAnimation,
    right: shadowStyles.locals.slideRightAnimation,
  };
  const flippedAnimations = {
    top: 'bottom',
    bottom: 'top',
    left: 'right',
    right: 'left',
  };

  // if the tooltip has been flipped we need to apply the opposite animation
  const actualPosition = elem.isFlipped ? flippedAnimations[position] : position;
  return animationMapping[actualPosition] ? animationMapping[actualPosition] : undefined;
}

// Function passed to Layer -> Alignment -> Popper and called when Popper performs an update.
// data is an object containing all the information computed by Popper.js (boundary element,
// offsets, originalPlacement, placement, styles)
function layerOnUpdate(data, elem) {
  // Check if the Layer has been flipped
  elem.isFlipped = (data.placement !== data.originalPlacement);
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
      [getAnimationClass(elem, elem.position)]: elem.visible,
    });
    const layerClasses = classNames({
      [shadowStyles.locals.hidden]: !elem.visible,
    });

    return (
      <div>
        <style>{shadowStyles.toString()}</style>
        <Layer
          target={elem.target}
          position={positionToPopperPosition(elem.position)}
          className={layerClasses}
          ref={(ref) => (elem.layer = ref)}
          enableFlip="true"
          updateCallback={(data) => layerOnUpdate(data, elem)}
        >
          <div className={messageBoxClasses}>{elem.description}</div>
        </Layer>
      </div>
    );
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
    // These two props are not API thus, dont have jsdocs.
    visible: prop.boolean({
      attribute: true,
    }),
    isFlipped: prop.boolean({
      initial: false,
    }),
  },
});

export { TooltipTrigger };
