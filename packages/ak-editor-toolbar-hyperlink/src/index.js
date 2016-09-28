import 'style!./host.less';
import { vdom, define, prop, emit } from 'skatejs';
import shadowStyles from './shadow.less';
import EditorButton from 'ak-editor-button';
import Icon from 'ak-editor-icon';
import Popup from 'ak-editor-popup';
import TextInput from 'ak-editor-popup-text-input';

export default define('ak-editor-toolbar-hyperlink', {
  created(elem) {
    elem.onLinkButtonClick = elem.onLinkButtonClick.bind(elem);
    elem.onPopupClick = elem.onPopupClick.bind(elem);
    elem.onKeyup = elem.onKeyup.bind(elem);
    elem.openHyperlink = elem.openHyperlink.bind(elem);
    elem.closeHyperlink = elem.closeHyperlink.bind(elem);
    elem.toggleHyperlink = elem.toggleHyperlink.bind(elem);
  },
  attached(elem) {
    document.addEventListener('click', elem.closeHyperlink, true);
  },
  detached(elem) {
    document.removeEventListener('click', elem.closeHyperlink, true);
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
          onclick={elem.onPopupClick}
        >
          <TextInput className="text-input" placeholder="Paste link" />
        </Popup>
      </div>
    );
  },
  rendered(elem) {
    if (elem.justOpenedHyperlink) {
      const textInput = elem.shadowRoot.querySelector('.text-input');
      // next tick
      setTimeout(() => textInput.focus());
      elem.justOpenedHyperlink = false;
    }
  },
  prototype: {
    onLinkButtonClick() {
      if (this.disabled || this.active) {
        this.closeHyperlink();
        return;
      }

      this.openHyperlink();
    },
    onPopupClick() {
      this.openHyperlink();
    },
    onKeyup(event) {
      if (event.keyCode === 13) {
        const textInput = this.shadowRoot.querySelector('.text-input');
        this.closeHyperlink();
        emit(this, 'save', { detail: { value: textInput.value } });
        textInput.value = '';
      }
    },
    openHyperlink() {
      this.open = true;
      this.justOpenedHyperlink = true;
    },
    closeHyperlink() {
      this.wasOpen = this.open;
      this.open = false;
    },
    toggleHyperlink() {
      if (this.wasOpen) {
        this.closeHyperlink();
      } else {
        this.openHyperlink();
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
