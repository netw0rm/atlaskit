import { define, vdom } from 'skatejs';
import shadowStyles from './shadow.less';
import headStyles from 'style!./host.less'; // eslint-disable-line import/no-unresolved, no-unused-vars, max-len

export default define('editor-toolbar', {
  render: () => (
    <div className={shadowStyles.locals.root}>
      <style>{shadowStyles.toString()}</style>
      <slot />
    </div>
  ),
});
