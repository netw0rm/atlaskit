import headStyles from 'style!./host.less'; // eslint-disable-line no-unused-vars, import/no-unresolved, max-len
import shadowStyles from './shadow.less';

import { define, vdom } from 'skatejs';

const definition = {
  render(elem) {
    // REMOVING THIS LINE WILL PREVENT THE STYLE TAG BEING RENDERED IN THE SHADOW DOM
    vdom.style(shadowStyles.toString());
    vdom.div(`I am an <${elem.tagName}!> element!`);
  },
};

/* The constructor for our component */
export default () => define('akutil-component-template', definition);

export { definition };
