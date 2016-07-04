import hostStyles from 'style!./host.less'; // eslint-disable-line import/no-unresolved
import shadowStyles from './shadow.less';

import { define, vdom, state } from 'skatejs';
const definition = {
  render(elem) {
    // REMOVING THIS LINE WILL PREVENT THE STYLE TAG BEING RENDERED IN THE SHADOW DOM
    vdom.style(shadowStyles.toString());
    vdom.div(`I am an <${elem.tagName}> element!`);
  },
  ready(elem) {
    state(elem, {
      className: hostStyles['akutil-component-template'],
    });
  },
};

/* The constructor for our component */
export default () => define('akutil-component-template', definition);

export { definition };
