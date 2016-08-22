import 'style!./host.less';
import { vdom, define, prop, emit, symbols } from 'skatejs';
import shadowStyles from './shadow.less';
import EditorButton from 'ak-editor-button';
import Icon from 'ak-editor-icon';
import Popup from 'ak-editor-popup';
import TextInput from 'ak-editor-popup-text-input';

function toggle(elem, input) {
  elem.open = !elem.open;

  if (elem.open) {
    const textInput = input || elem[symbols.shadowRoot].querySelector('.text-input');

    // todo: fix the hack
    setTimeout(() => textInput.focus(), 5);
  }
}

export default define('ak-editor-toolbar-hyperlink', {
  render(elem) {
    const LinkButton = (<EditorButton
      className="link-button"
      onClick={() => {
        if (!elem.disabled) {
          toggle(elem);
        }
      }}
      disabled={elem.disabled}
    ><Icon glyph="link" /></EditorButton>);

    let linkButton;

    /* eslint-disable no-return-assign  */
    /* eslint-disable new-cap  */
    return (
      <div
        onKeyup={event => {
          if (event.keyCode === 13) {
            const textInput = elem[symbols.shadowRoot].querySelector('.text-input');
            const popup = elem[symbols.shadowRoot].querySelector('.popup');
            popup.open = false;
            emit(elem, 'save', { detail: { value: textInput.value } });
          }
        }}
      >
        <style>{shadowStyles.toString()}</style>

        {linkButton = LinkButton()}

        <Popup
          class="popup"
          target={linkButton}
          open={elem.open}
          on-ak-blanket-click={() => toggle(elem)}
        >
          <TextInput className="text-input" placeholder="Paste link" />
        </Popup>
      </div>
    );
  },
  props: {
    disabled: prop.boolean({ attribute: true }),
    /**
     * @description Controls disablily of an popup.
     * @memberof Popup
     * @instance
     * @default false
     * @type Boolean
     * @example @html <ak-editor-popup disabled></ak-editor-popup>
     * @example @js dialog.disabled = true;
     */
    open: prop.boolean({ attribute: true }),
  },
});
