import { define, vdom } from 'skatejs';
import shadowStyles from './shadow.less';
import 'style!./host.less';

export default define('ak-editor-toolbar', {
  render: () => (
    <div class={shadowStyles.locals.root}>
      <style>{shadowStyles.toString()}</style>
      <slot />
    </div>
  ),
});
