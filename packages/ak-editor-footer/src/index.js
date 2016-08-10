import { define, vdom, prop, emit } from 'skatejs';
import shadowStyles from './shadow.less';
import 'style!./host.less';

export default define('ak-editor-footer', {
  render: (elem) => {
    const classLists = [
      [shadowStyles.locals.root],
      elem.openTop ? [shadowStyles.locals.openTop] : [],
    ];
    const classNames = classLists.reduce((a, b) => a.concat(b), []).join(' ');

    return (
      <div className={classNames}>
        <style>{shadowStyles.toString()}</style>
        <button
          className={shadowStyles.locals.saveButton}
          onclick={() => emit(elem, 'save')}
        >Save</button>
        <button
          className={shadowStyles.locals.cancelButton}
          onclick={() => emit(elem, 'cancel')}
        >Cancel</button>
      </div>
    );
  },

  props: {
    openTop: prop.boolean({ attribute: true, default: false }),
  },
});
