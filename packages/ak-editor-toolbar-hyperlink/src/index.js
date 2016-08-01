/** @jsx vdom */
import 'style!./host.less';

import { vdom, define, prop, emit, symbols } from 'skatejs';
import shadowStyles from './shadow.less';
import EditorButton from 'ak-editor-button';
import Icon from 'ak-editor-icon';
import Popup from 'ak-editor-popup';
import TextInput from 'ak-editor-hyperlink-popup-text-input';

function toggle(elem, input) {
  elem.open = !elem.open;

  if (elem.open) {
    const textInput = input || elem[symbols.shadowRoot].querySelector('.text-input');

    // todo: fix the hack
    setTimeout(() => textInput.focus(), 5);
  }
}

const definition = {
  render(elem) {
    const LinkButton = (<EditorButton
      class="link-button"
      onclick={() => {
        if (!elem.disabled) {
          toggle(elem);
        }
      }}
      disabled={elem.disabled}
    ><Icon glyph="link" /></EditorButton>);

    let linkButton;

    return (
      <div
        onkeyup={event => {
          if (event.keyCode === 13) {
            const textInput = elem[symbols.shadowRoot].querySelector('.text-input');
            toggle(elem, textInput);
            emit(elem, 'save', { detail: { value: textInput.value } });
          }
        }}
      >
        <style>{shadowStyles.toString()}</style>

        {linkButton = LinkButton()}

        <Popup
          target={linkButton}
          open={elem.open}
          onak-blanket-click={() => toggle(elem)}
        >
          <TextInput class="text-input" placeholder="Paste link" />
        </Popup>
      </div>
    );
  },
  props: {
    /* eslint-disable max-len  */
    /**
     * @description Controls visibility of an popup. Dialog is invisible by default.
     * @memberof Popup
     * @instance
     * @default false
     * @type Boolean
     * @example @html <ak-editor-popup open></ak-editor-popup>
     * @example @js dialog.open = true;
     */
    open: prop.boolean({
      attribute: true,
      default: false,
    }),
    disabled: prop.boolean({
      attribute: true,
      default: false,
    }),
  },
};

export default define('ak-editor-toolbar-hyperlink', definition);
