import headStyles from 'style!./host.less'; // eslint-disable-line no-unused-vars, import/no-unresolved, max-len
import shadowStyles from './shadow.less';

import { skate, vdom } from 'skatejs';

export default skate('_COMPONENT_TEMPLATE', {
  render(elem) {
    // REMOVING THIS LINE WILL PREVENT THE STYLE TAG BEING RENDERED IN THE SHADOW DOM
    vdom.style(shadowStyles.toString());
    vdom.div(`I am a ${elem.tagName}!`);
  },
});
