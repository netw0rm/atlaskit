import 'style!./host.less';
import { vdom, define, prop, emit } from 'skatejs';
import shadowStyles from './shadow.less';
import EditorButton from 'ak-editor-button';
import Icon from 'ak-editor-icon';
import Popup from 'ak-editor-popup';
import TextInput from 'ak-editor-popup-text-input';

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
    elem.toggleHyperlink = elem.toggleHyperlink.bind(elem);
    elem.onKeyup = elem.onKeyup.bind(elem);
    elem.openHyperlink = elem.openHyperlink.bind(elem);
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
        onClick={elem.toggleHyperlink}
        active={active}
        disabled={elem.disabled}
      >
        <Icon glyph="link" {...((active) ? { fill: 'white' } : {})} />
      </EditorButton>
    );

    let linkButton;

    /* eslint-disable no-return-assign  */
    /* eslint-disable new-cap  */
    return (
      <div
        onKeyup={elem.onKeyup}
      >
        <style>{shadowStyles.toString()}</style>

        {linkButton = LinkButton()}

        <Popup
          class="popup"
          target={linkButton}
          open={elem.open}
          on-activate={elem.openHyperlink}
        >
          <TextInput className="text-input" placeholder="Paste link" />
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
    openHyperlink() {
      this.open = true;
      this.justOpenedHyperlink = true;
    },
    save() {
      const textInput = this.shadowRoot.querySelector('.text-input');
      this.open = false;
      emit(this, 'save', { detail: { value: textInput.value } });
      textInput.value = '';
    },
    handleClickOutside(e) {
      // todo: we will use a common helper function when it's ready.
      // https://ecosystem.atlassian.net/browse/AK-513
      if (this.open && e.target !== this && !isDescendantOf(e.target, this) &&
        !(e.path && e.path.indexOf(this) > -1)) {
        this.save();
      }
    },
    toggleHyperlink() {
      if (this.disabled) {
        return;
      }

      if (this.open) {
        this.open = false;
      } else {
        this.openHyperlink();
      }
    },
    onKeyup(event) {
      if (event.keyCode === 13) {
        this.save();
      } else if (event.keyCode === 27) {
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
