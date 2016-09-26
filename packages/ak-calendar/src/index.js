/** @jsx h */

import { define, h, vdom } from 'skatejs';
import { style } from 'akutil-common';
import * as events from './internal/events';

/**
 * @description Create instances of the component programmatically, or using markup.
 * @class Calendar
 * @example @js import Calendar from 'ak-calendar';
 * const component = new Calendar();
 */
export default define('ak-calendar', {
  render() {
    style(vdom, {
      ':host': {
        'background-color': 'white',
        display: 'block',
        height: '200px',
        width: '200px',
      },
    });
    return <div />;
  },
});

export { events };
