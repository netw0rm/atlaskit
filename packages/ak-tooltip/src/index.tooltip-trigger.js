import 'style!./host.less';
import debounce from 'debounce';
import { vdom, define } from 'skatejs';
import { handleMouseEnter, handleMouseLeave } from './internal/event-handlers';


/**
 * @description Create instances of a tooltip-trigger programmatically, or using markup.
 * @class TooltipTrigger
 * @example @html <ak-tooltip-trigger position="bottom" description="Save">
 *   <ak-button glyph="Save" described-by="myTooltip"></ak-button>
 * </ak-tooltip>
 * @example @js import TooltipTrigger from 'ak-tooltip-trigger'
 * const trigger = new TooltipTrigger();
 * trigger.position = 'bottom';
 * trigger.description = 'Save';
 * trigger.innerHTML = '<ak-button glyph="Save" aria-describedby="myTooltip"></ak-button>';
 */
export default define('ak-tooltip-trigger', {
  render(elem) {
    return (
      <div>
        <slot ref={el => (elem.slotElem = el)} />
      </div>
    );
  },
  created(elem) {
    // we set the useCapture flag because the focus event wont bubble upwards
    const useCapture = true;
    // we set the 'immediate' flag for debounce to make debounce trigger immediately on the first
    // instance of the event firing (it wont have to wait for the debouncePeriod)
    const debounceFireImmediately = true;
    const handleEnter = debounce(handleMouseEnter, 200, debounceFireImmediately);
    const handleLeave = debounce(handleMouseLeave, 200, debounceFireImmediately);

    elem.addEventListener('mouseenter', handleEnter);
    elem.addEventListener('focus', handleEnter, useCapture);
    elem.addEventListener('mouseleave', handleLeave);
    elem.addEventListener('blur', handleLeave, useCapture);
  },
  props: {
    /**
     * @description The location of where the tooltip will appear, relative to the component it
     * is bound to.
     * Allowed values: top, bottom, left and right.
     * @memberof TooltipTrigger
     * @instance
     * @type {string}
     * @default bottom
     */
    position: {
      default: 'bottom',
      attribute: true,
    },
    /**
     * @description The text to display in the tooltip when a user hovers or focuses on the
     * wrapped element.
     * @memberof TooltipTrigger
     * @instance
     * @type {string}
     * @default none
     */
    description: {
      attribute: true,
    },
  },
});

