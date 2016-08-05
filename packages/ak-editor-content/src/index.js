import { define, vdom, prop } from 'skatejs';
import shadowStyles from './shadow.less';
import 'style!./host.less';

export default define('ak-editor-content', {
  render: (elem) => {
    const classLists = [
      [shadowStyles.locals.root],
      elem.openTop ? [shadowStyles.locals.openTop] : [],
      elem.openBottom ? [shadowStyles.locals.openBottom] : [],
    ];
    const classNames = classLists.reduce((a, b) => a.concat(b), []).join(' ');

    return (
      <div class={classNames}>
        <style>{shadowStyles.toString()}</style>
        <slot />
      </div>
    );
  },

  props: {
    openTop: prop.boolean({ attribute: true }),
    openBottom: prop.boolean({ attribute: true }),
  },
});
