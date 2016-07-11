/** @jsx vdom */
import 'style!./host.less'; // eslint-disable-line import/no-unresolved

import { vdom } from 'skatejs';
import shadowStyles from './shadow.less';

const definition = {
  render(elem) {
    return (
      // JSX requires that there only be a single root element.
      // Incremental DOM doesn't require this.
      <div>
        {/* This is required for elements in the shadow root to be styled.
           This is wrapped in the <div /> because you can't have more than one
           root element.
        */}
        <style>{shadowStyles.toString()}</style>
        <p className={shadowStyles.locals.myClassName}>I am an {elem.tagName} element!</p>
      </div>
    );
  },
};

export default definition;
