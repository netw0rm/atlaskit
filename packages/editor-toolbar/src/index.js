import { define, vdom } from 'skatejs';
import shadowStyles from './shadow.less';
import 'style!./host.less';

export default define('editor-toolbar', {
  render: () => (
    <div className={shadowStyles.locals.root}>
      <style>{shadowStyles.toString()}</style>
      <slot />
    </div>
  ),
});
