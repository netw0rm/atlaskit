import { define, vdom, prop } from 'skatejs';
import shadowStyles from './shadow.less';
import headStyles from 'style!./host.less'; // eslint-disable-line import/no-unresolved, no-unused-vars, max-len

export default define('editor-content', {
  render: (elem) => {
    const classLists = [
      [shadowStyles.locals.root],
      elem.openTop ? [shadowStyles.locals.openTop] : [],
      elem.openBottom ? [shadowStyles.locals.openBottom] : [],
    ];
    const classNames = classLists.reduce((a, b) => a.concat(b), []).join(' ');

    return (
      <div className={classNames}>
        <style>{shadowStyles.toString()}</style>
        <slot />
      </div>
    );
  },

  props: {
    openTop: prop.boolean({ attribute: true, default: false }),
    openBottom: prop.boolean({ attribute: true, default: false }),
  },
});
