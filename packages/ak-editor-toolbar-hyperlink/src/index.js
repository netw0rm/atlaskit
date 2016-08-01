/** @jsx vdom */
import 'style!./host.less';

import { vdom, define, prop, emit, symbols } from 'skatejs';
import shadowStyles from './shadow.less';
import EditorButton from 'ak-editor-button';
import Icon from 'ak-editor-icon';
import HyperlinkPopup from 'ak-editor-hyperlink-popup';
import HyperlinkPopupTextInput from 'ak-editor-hyperlink-popup-text-input';

function toggle(elem, input) {
  elem.open = !elem.open;

  if (elem.open) {
    const popupInput = input || elem[symbols.shadowRoot].querySelector('.popup-input');

    // todo: fix the hack
    setTimeout(() => popupInput.focus(), 5);
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
            const input = elem[symbols.shadowRoot].querySelector('.popup-input');
            toggle(elem, input);
            emit(elem, 'save', { detail: { value: input.value } });
          }
        }}
      >
        <style>{shadowStyles.toString()}</style>

        {linkButton = LinkButton()}

        <HyperlinkPopup
          target={linkButton}
          open={elem.open}
          onclickOverlay={() => toggle(elem)}
        >
          <HyperlinkPopupTextInput class="popup-input" placeholder="Paste link" />
        </HyperlinkPopup>
      </div>
    );
  },
  props: {
    /* eslint-disable max-len  */
    /**
     * @description Controls visibility of an hyperlink-popup. Dialog is invisible by default.
     * @memberof HyperlinkPopup
     * @instance
     * @default false
     * @type Boolean
     * @example @html <ak-editor-hyperlink-popup open></ak-editor-hyperlink-popup>
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
