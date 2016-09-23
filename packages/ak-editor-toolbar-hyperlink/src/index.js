import 'style!./host.less';
import { vdom, define, prop, emit } from 'skatejs';
import shadowStyles from './shadow.less';
import EditorButton from 'ak-editor-button';
import Icon from 'ak-editor-icon';
import Popup from 'ak-editor-popup';
import TextInput from 'ak-editor-popup-text-input';

export default define('ak-editor-toolbar-hyperlink', {
  created(elem) {
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
      onClick={() => {
        if (!elem.disabled) {
          elem.openHyperlink();
        }
      }}
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
        onKeyup={event => {
          if (event.keyCode === 13) {
            const textInput = elem.shadowRoot.querySelector('.text-input');
            elem.closeHyperlink();
            emit(elem, 'save', { detail: { value: textInput.value } });
            textInput.value = '';
          }
        }}
      >
        <style>{shadowStyles.toString()}</style>

        {linkButton = LinkButton()}

        <Popup
          target={linkButton}
          open={elem.open}
          on-activate={elem.openHyperlink}
        >
          <TextInput className="text-input" placeholder="Paste link" />
        </Popup>
      </div>
    );
  },
  prototype: {
    openHyperlink() {
      this.open = true;

      const textInput = this.shadowRoot.querySelector('.text-input');

      // todo: fix the hack
      setTimeout(() => textInput.focus(), 5);
    },
    closeHyperlink() {
      this.open = false;
    },
  },
  props: {
    disabled: prop.boolean({ attribute: true }),
    /**
     * @description Controls visibility of an popup. Dialog is invisible by default.
     * @memberof Popup
     * @instance
     * @default false
     * @type Boolean
     * @example @html <ak-editor-popup open></ak-editor-popup>
     * @example @js dialog.open = true;
     */
    open: prop.boolean({ attribute: true }),
    active: prop.boolean({ attribute: true }),
  },
});
