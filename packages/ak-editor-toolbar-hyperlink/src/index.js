import 'style!./host.less';
import { vdom, define, prop, emit } from 'skatejs';
import shadowStyles from './shadow.less';
import EditorButton from 'ak-editor-button';
import Icon from 'ak-editor-icon';
import Popup from 'ak-editor-popup';
import TextInput from 'ak-editor-popup-text-input';

export default define('ak-editor-toolbar-hyperlink', {
  created(elem) {
    elem.onClick = elem.onClick.bind(elem);
    elem.onKeyup = elem.onKeyup.bind(elem);
    elem.openHyperlink = elem.openHyperlink.bind(elem);
    elem.closeHyperlink = elem.closeHyperlink.bind(elem);
  },
  attached(elem) {
    document.addEventListener('click', elem.closeHyperlink, true);
  },
  detached(elem) {
    document.removeEventListener('click', elem.closeHyperlink, true);
  },
  render(elem) {
    const LinkButton = (<EditorButton
      className="link-button"
      onClick={elem.onClick}
      active={elem.active || elem.open}
      disabled={elem.disabled}
    >
      <Icon glyph="link" {...((elem.active || elem.open) ? { fill: 'white' } : {})} />
    </EditorButton>);

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
    if (elem.justOpenedHyperlink) {
      const textInput = elem.shadowRoot.querySelector('.text-input');
      // next tick
      setTimeout(() => textInput.focus());
      elem.justOpenedHyperlink = false;
    }
  },
  prototype: {
    onClick() {
      if (!this.disabled) {
        this.openHyperlink();
      }
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
      this.open = false;
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
