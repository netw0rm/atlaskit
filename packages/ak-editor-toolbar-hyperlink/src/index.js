/** @jsx vdom */
import 'style!./host.less';

import { vdom, define, prop, emit, symbols } from 'skatejs';
import shadowStyles from './shadow.less';
import EditorButton from 'ak-editor-button';
import Icon from 'ak-editor-icon';
import HyperlinkPopup from 'ak-editor-hyperlink-popup';

function toggle(elem) {
  elem.open = !elem.open;

  if (elem.open) {
    const input = elem[symbols.shadowRoot].querySelector('.input');

    // todo: fix the hack
    setTimeout(() => input.focus(), 5);
  }
}

const definition = {
  render(elem) {
    const marginLeft = 5;

    const LinkButton = (<EditorButton
      class="link-button"
      onclick={() => toggle(elem)}
      disabled={elem.disabled}
    ><Icon glyph="link" /></EditorButton>);

    let linkButton;

    return (
      <div
        onkeyup={event => {
          if (event.keyCode === 13) {
            toggle(elem);
            emit(elem, 'enterkeyup');
          }
        }}
      >
        <style>{shadowStyles.toString()}</style>

        {linkButton = LinkButton()}

        <HyperlinkPopup
          target={linkButton}
          open={elem.open}
          class="ak-editor-hyperlink-popup"
          onclickOverlay={() => toggle(elem)}
        >
          <EditorButton>
            <Icon glyph="unlink" fill="white" style={{ marginLeft }} />
          </EditorButton>
          <EditorButton>
            <Icon glyph="open" fill="white" style={{ marginLeft }} />
          </EditorButton>
          <div style={{ height: '100%', width: 1, background: 'lightgrey', marginLeft }} />
          <input style={{ marginLeft }} class="input" />
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
