/** @jsx vdom */

import { vdom, define, prop, emit } from 'skatejs';
import EditorButton from 'ak-editor-button';
import LinkIcon from 'ak-icon/glyph/editor/link';
import Popup from 'ak-editor-popup';
import TextInput from 'ak-editor-popup-text-input';

import 'style!./host.less';

import shadowStyles from './shadow.less';


// todo: we will use a common helper function when it's ready.
// https://ecosystem.atlassian.net/browse/AK-513
function isDescendantOf(child, parent) {
  if (child.parentNode === parent) {
    return true;
  } else if (child.parentNode === null) {
    return false;
  }

  return isDescendantOf(child.parentNode, parent);
}

export default define('ak-editor-toolbar-hyperlink', {
  created(elem) {
    elem.openHyperlinkPanel = elem.openHyperlinkPanel.bind(elem);
    elem.closeHyperlinkPanel = elem.closeHyperlinkPanel.bind(elem);
    elem.toggleHyperlinkPanel = elem.toggleHyperlinkPanel.bind(elem);
    elem.addHyperlink = elem.addHyperlink.bind(elem);
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
        className="link-button"
        onClick={elem.toggleHyperlinkPanel}
        active={active}
        disabled={elem.disabled}
      >
        <LinkIcon {...((active) ? { style: { color: 'white' } } : {})} />
      </EditorButton>
    );

    let linkButton;

    /* eslint-disable no-return-assign  */
    /* eslint-disable new-cap  */
    return (
      <div>
        <style>{shadowStyles.toString()}</style>

        {linkButton = LinkButton()}

        <Popup
          class="popup"
          target={linkButton}
          open={elem.open}
          on-activate={elem.openHyperlinkPanel}
        >
          <TextInput
            className="text-input"
            placeholder="Paste link"
            onEnterKeyup={elem.addHyperlink}
            onEscKeyup={elem.closeHyperlinkPanel}
          />
        </Popup>
      </div>
    );
  },
  rendered(elem) {
    // `elem.justOpenedHyperlink` is for focusing on the input
    // if we just opened hyperlink, we want to focus on the input straight away
    // else, don't auto focus on it
    if (elem.justOpenedHyperlink) {
      const textInput = elem.shadowRoot.querySelector('.text-input');
      // next tick
      // because dom is rendered async but the API is not,
      // `textInput` is only availale on dom in the next tick
      setTimeout(() => textInput.focus());
      elem.justOpenedHyperlink = false;
    }
  },
  prototype: {
    openHyperlinkPanel() {
      this.open = true;
      this.justOpenedHyperlink = true;
    },
    closeHyperlinkPanel() {
      this.open = false;
    },
    toggleHyperlinkPanel() {
      if (this.disabled) {
        return;
      }

      if (this.open) {
        this.open = false;
      } else {
        this.openHyperlinkPanel();
      }
    },
    addHyperlink(event) {
      const textInput = this.shadowRoot.querySelector('.text-input');
      textInput.value = '';
      emit(this, 'addHyperlink', event);
      this.closeHyperlinkPanel();
    },
    handleClickOutside(e) {
      // todo: we will use a common helper function when it's ready.
      // https://ecosystem.atlassian.net/browse/AK-513
      if (this.open && e.target !== this && !isDescendantOf(e.target, this) &&
        !(e.path && e.path.indexOf(this) > -1)) {
        this.open = false;
      }
    },
  },
  props: {
    /**
     * @description Controls disablily of an popup.
     * @memberof Popup
     * @instance
     * @default false
     * @type Boolean
     * @example @html <ak-editor-popup disabled></ak-editor-popup>
     * @example @js dialog.disabled = true;
     */
    disabled: prop.boolean({ attribute: true }),
    open: prop.boolean({ attribute: true }),
    active: prop.boolean({ attribute: true }),
  },
});
