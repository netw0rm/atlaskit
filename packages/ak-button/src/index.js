/** @jsx vdom */
import 'style!./host.less'; // eslint-disable-line import/no-unresolved

import { vdom } from 'skatejs';
import shadowStyles from './shadow.less';

const definition = {
  props: {
    label: { attribute: true },
  },
  render(elem) {
    return (
      <div>
        <style>{shadowStyles.toString()}</style>
        <button className={shadowStyles.locals.myClassName}>{elem.label}</button>
      </div>
    );
  },
};

export default definition;
