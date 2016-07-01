import { define, vdom, state, symbols } from 'skatejs';
import shadowStyles from './shadow.less';
import headStyles from 'style!./host.less';

export default define('editor-toolbar', {
  render: () => {
    return (
      <div className={shadowStyles.locals.root}>
        <style>{shadowStyles.toString()}</style>
        <slot />
      </div>
    );
  }
});
