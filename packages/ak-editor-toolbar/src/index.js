/** @jsx vdom */

import { define, vdom } from 'skatejs';

import 'style!./host.less';

import shadowStyles from './shadow.less';


export default define('ak-editor-toolbar', {
  render: () => (
    <div className={shadowStyles.locals.root}>
      <style>{shadowStyles.toString()}</style>
      <slot />
    </div>
  ),
});
