import { define, vdom, prop, emit } from 'skatejs';
import shadowStyles from './shadow.less';
import 'style!./host.less';
import Icon from 'ak-editor-icon';

function tools() {
  return ['mention', 'image']
    .map((icon) => (
      <button
        className={shadowStyles.locals.iconButton}
        onclick={(event) => emit(event.currentTarget, `click${icon}`)}
      >
        <Icon glyph={icon} />
      </button>
  ));
}

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
        <div className={shadowStyles.locals.buttons}>
          <button
            className={shadowStyles.locals.saveButton}
            onclick={() => emit(elem, 'save')}
          >Save</button>
          <button
            className={shadowStyles.locals.cancelButton}
            onclick={() => emit(elem, 'cancel')}
          >Cancel</button>
        </div>
        <div className={shadowStyles.locals.tools}>
          {tools()}
        </div>
      </div>
    );
  },

  props: {
    openTop: prop.boolean({ attribute: true, default: false }),
  },
});
