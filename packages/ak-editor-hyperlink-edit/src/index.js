/** @jsx vdom */

import { define, vdom, prop, emit } from 'skatejs';
import Button from 'ak-button';
import OpenIcon from 'ak-icon/glyph/editor/open';
import UnlinkIcon from 'ak-icon/glyph/editor/unlink';
import Popup from 'ak-editor-popup';
import TextInput from 'ak-editor-popup-text-input';

import 'style!./host.less';

import shadowStyles from './shadow.less';

const onUnlinkSymbol = '__onUnlink__';
function If(props, chren) {
  return props.condition ? chren() : null;
}

export default define('ak-editor-hyperlink-edit', {
  render(elem) {
    const showOpenButton = (elem.href !== null && typeof elem.href !== 'undefined');
    const showUnlinkButton = elem.canUnlink;
    const showSeparator = showOpenButton || showUnlinkButton;
    return (
      <div className={shadowStyles.locals.root}>
        <style>{shadowStyles.toString()}</style>

        <Popup target={elem.attachTo} open>
          <If condition={showOpenButton}>
            <Button
              appearance="subtle"
              spacing="none"
              theme="dark"
              className={shadowStyles.locals.button}
              href={elem.href}
              target="_blank"
            >
              <OpenIcon style={{ color: 'white' }} />
            </Button>
          </If>
          <If condition={showUnlinkButton}>
            <Button
              appearance="subtle"
              spacing="none"
              theme="dark"
              className={shadowStyles.locals.button}
              onclick={() => emit(elem, 'unlink')}
            >
              <UnlinkIcon style={{ color: 'white' }} />
            </Button>
          </If>
          <If condition={showSeparator}>
            <span className={shadowStyles.locals.separator} />
          </If>
          <TextInput
            className={shadowStyles.locals.textInput}
            placeholder={elem.textInputPlaceholder}
            value={elem.textInputValue}
          />
        </Popup>
      </div>
    );
  },

  props: {
    // URL of the hyperlink. The presence of this attribute causes an "open"
    // hyperlink to be rendered in the popup.
    href: prop.string({ attribute: true }),
    // Surprisingly not all hyperlinks can be unlinked. For example when the
    // storage format is Markdown, you can't represent some a URL as plain text
    // using standard markdown syntax alone.
    canUnlink: prop.boolean({ attribute: true, default: true }),
    textInputPlaceholder: prop.string({ attribute: true }),
    textInputValue: prop.string({ attribute: true }),
    attachTo: { attribute: true },
  },

  prototype: {
    [onUnlinkSymbol]() {
      if (emit(this, 'unlink') && this.parentNode) {
        this.parentNode.removeChild(this);
      }
    },
  },
});
