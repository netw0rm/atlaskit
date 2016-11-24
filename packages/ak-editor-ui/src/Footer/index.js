/** @jsx vdom */

import { define, vdom, prop, emit, Component } from 'skatejs';
import AkButton, { APPEARANCE } from 'ak-button';
import AkButtonGroup from 'ak-button-group';
import MentionIcon from 'ak-icon/glyph/editor/mention';
import ImageIcon from 'ak-icon/glyph/editor/image';
import shadowStyles from './shadow.less';

const icons = {
  mention: MentionIcon,
  image: ImageIcon,
};

function insert() {
  return Object.entries(icons)
    .map(([iconName, Icon]) => (
      <button
        className={shadowStyles.locals.iconButton}
        onClick={event => emit(event.currentTarget, `insert${iconName}`)}
      >
        <Icon />
      </button>
  ));
}

export default define('ak-editor-ui-footer', class extends Component {
  static render(elem) {
    const classLists = [
      [shadowStyles.locals.root],
      elem.openTop ? [shadowStyles.locals.openTop] : [],
      [shadowStyles.locals.footer],
    ];
    const classNames = classLists.reduce((a, b) => a.concat(b), []).join(' ');

    return (
      <div className={classNames}>
        <style>{shadowStyles.toString()}</style>
        <AkButtonGroup
          className={shadowStyles.locals.actions}
          style={(elem.hideButtons ? { visibility: 'hidden' } : '')}
        >
          <AkButton
            className={shadowStyles.locals.saveButton}
            appearance={APPEARANCE.PRIMARY}
            onclick={() => emit(elem, 'save')}
          >
            Save
          </AkButton>
          <AkButton
            className={shadowStyles.locals.cancelButton}
            appearance={APPEARANCE.SUBTLE}
            onclick={() => emit(elem, 'cancel')}
          >
            Cancel
          </AkButton>
        </AkButtonGroup>
        <div className={shadowStyles.locals.insert}>
          {insert()}
        </div>
      </div>
    );
  }

  static get props() {
    return {
      hideButtons: prop.boolean({ attribute: true, default: false }),
      openTop: prop.boolean({ attribute: true, default: false }),
    };
  }
});
