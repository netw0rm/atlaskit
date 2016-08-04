/** @jsx vdom */
import 'style!./host.less';

import { vdom, define, prop, emit, symbols } from 'skatejs';
import shadowStyles from './shadow.less';
import EditorButton from 'ak-editor-button';
import Icon from 'ak-editor-icon';
import Popup from 'ak-editor-popup';
import TextInput from 'ak-editor-popup-text-input';

const definition = {
  render(elem) {
    const LinkButton = (<EditorButton
      class="link-button"
      disabled={elem.disabled}
    ><Icon glyph="link" /></EditorButton>);

    let linkButton;

    /* eslint-disable no-return-assign  */
    /* eslint-disable new-cap  */
    return (
      <div
        onclick={() => {
          if (!elem.disabled) {
            const popup = elem[symbols.shadowRoot].querySelector('.popup');
            popup.open = true;

            const textInput = elem[symbols.shadowRoot].querySelector('.text-input');

            // todo: fix the hack
            setTimeout(() => textInput.focus(), 5);
          }
        }}

        onkeyup={event => {
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
        >
          <TextInput class="text-input" placeholder="Paste link" />
        </Popup>
      </div>
    );
  },
  props: {
    /* eslint-disable max-len  */
    /**
     * @description Controls disablily of an popup.
     * @memberof Popup
     * @instance
     * @default false
     * @type Boolean
     * @example @html <ak-editor-popup disabled></ak-editor-popup>
     * @example @js dialog.disabled = true;
     */
    disabled: prop.boolean({
      attribute: true,
      default: false,
    }),
  },
};

export default define('ak-editor-toolbar-hyperlink', definition);
