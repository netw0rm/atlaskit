import { define, vdom, state, symbols, prop } from 'skatejs';
import shadowStyles from './shadow.less';
import headStyles from 'style!./host.less';

export default define('editor-content', {
  render: (elem) => {
    return (
      <div className={`${shadowStyles.locals.root} ${elem.openTop ? shadowStyles.locals.openTop : ''} ${elem.openBottom ? shadowStyles.locals.openBottom : ''}`}>
        <style>{shadowStyles.toString()}</style>
        <slot />
      </div>
    );
  },

  props: {
    openTop: prop.boolean({ attribute: true, default: false }),
    openBottom: prop.boolean({ attribute: true, default: false }),
  }
});
