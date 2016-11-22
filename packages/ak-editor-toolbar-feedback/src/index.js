/** @jsx vdom */

import { vdom, define, prop } from 'skatejs';
import EditorButton from 'ak-editor-button';
import Icon from 'ak-icon/glyph/feedback';

import 'style!./host.less';

import shadowStyles from './shadow.less';

// TODO: use a common helper function when it's ready.
// https://ecosystem.atlassian.net/browse/AK-513
function isDescendantOf(child, parent) {
  if (child.parentNode === parent) {
    return true;
  } else if (child.parentNode === null) {
    return false;
  }

  return isDescendantOf(child.parentNode, parent);
}

export default define('ak-editor-toolbar-feedback', {
  created(elem) {
    elem.openFeedbackPanel = elem.openFeedbackPanel.bind(elem);
    elem.closeFeedbackPanel = elem.closeFeedbackPanel.bind(elem);
    elem.toggleFeedbackPanel = elem.toggleFeedbackPanel.bind(elem);
    elem.handleClickOutside = elem.handleClickOutside.bind(elem);
  },
  attached(elem) {
    document.addEventListener('click', elem.handleClickOutside);
  },
  detached(elem) {
    document.removeEventListener('click', elem.handleClickOutside);
  },
  render(elem) {
    const active = elem.active || elem.open;

    const LinkButton = (
      <EditorButton
        className={shadowStyles.locals.button}
        onClick={elem.toggleFeedbackPanel}
        active={active}
        disabled={elem.disabled}
      >
        <Icon {...((active) ? { style: { color: 'white' } } : {})} />
      </EditorButton>
    );

    let linkButton;

    /* eslint-disable no-return-assign */
    /* eslint-disable new-cap */
    return (
      <div>
        <style>{shadowStyles.toString()}</style>
        <div className={shadowStyles.locals.wrapper}>
          {linkButton = LinkButton()}
          <div
            className={`${shadowStyles.locals.popup} ${elem.open ? shadowStyles.locals.open : ''}`}
            target={linkButton}
          >
            <button
              type="button"
              className={shadowStyles.locals.close}
              onClick={(e) => { e.preventDefault(); elem.closeFeedbackPanel(); }}
            >&#10005;</button>
            <iframe
              allowTransparency="true"
              frameBorder="0"
              scrolling="no"
              src={elem.feedbackFormUrl}
            />
          </div>
        </div>
      </div>
    );
  },

  prototype: {
    openFeedbackPanel() {
      this.open = true;
    },
    closeFeedbackPanel() {
      this.open = false;
    },
    toggleFeedbackPanel() {
      this.open = !this.open;
    },
    handleClickOutside(e) {
      // TODO: Refactor after React migration
      if (this.open && e.target !== this && !isDescendantOf(e.target, this) &&
        !(e.path && e.path.indexOf(this) > -1)) {
        this.open = false;
      }
    },
  },
  props: {
    open: prop.boolean({ attribute: true }),
    active: prop.boolean({ attribute: true }),
    feedbackFormUrl: prop.string({ attribute: true }),
  },
});
