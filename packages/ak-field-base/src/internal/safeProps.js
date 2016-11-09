import { emit, props } from 'skatejs';
import camelCase from 'camelcase';

/**
 * @description before setting a set of props, will emit an event for each one which may or may not
 * be cancelled. If the events are cancelled, the corresponding prop will not be applied.
 * @private
 * @param  {HTMLElement} elem The component to apply the props to.
 * @param  {Object} propsToChange An object containing the props to change and their values.
 * i.e { myPropName: 'myPropValue', secondProp: 'secondValue' }
 * would produce two events, 'myPropNameChange' and 'secondPropChange'
 */
export default function safeProps(elem, propsToChange) {
  Object.keys(propsToChange).forEach((prop) => {
    const eventName = camelCase(`before-${prop}-change`);
    const cancelled = !emit(elem, eventName, {
      bubbles: false,
      cancelable: true,
      detail: {
        [prop]: propsToChange[prop],
      },
    });
    if (!cancelled) {
      props(elem, { [prop]: propsToChange[prop] });
      return false;
    }
    return true;
  });
}
