/** @jsx vdom */
/* eslint react/no-unknown-property: 0 */
import 'style!./host.less';
import { enumeration } from 'akutil-common';
import { vdom, prop, define } from 'skatejs';
import shadowStyles from './shadow.less';
import Layer, { POSITION_ATTRIBUTE_ENUM, CONSTRAIN_ATTRIBUTE_ENUM } from 'ak-layer'; // eslint-disable-line no-unused-vars, max-len
import Overlay from 'ak-editor-overlay';

/**
 * @description The definition for the HyperlinkPopup component.
 * @class HyperlinkPopup
 * @example @html <ak-editor-hyperlink-popup target="#target"></ak-editor-hyperlink-popup>
 * @example @js import HyperlinkPopup from 'ak-editor-hyperlink-popup';
 * const myPopup = new HyperlinkPopup();
 *
 */
const definition = {
  render(elem) {
    const styles = {};
    if (elem.boxShadow) {
      styles.boxShadow = elem.boxShadow;
    }
    if (elem.padding) {
      styles.padding = elem.padding;
    }
    if (elem.borderRadius) {
      styles.borderRadius = elem.borderRadius;
    }

    return (
      <div onclickOverlay={() => { elem.open = !elem.open; }}>
        <Overlay open={elem.open} />
        <ak-layer
          open={elem.open}
          position="bottom center"
          attachment={elem.constrain}
          target={elem.target}
          onRender={(layer) => {
            if (elem.open && layer.alignment) {
              elem.positioned = true;
            }
          }}
        >
          <style>{shadowStyles.toString()}</style>
          <div class={shadowStyles.locals.hyperlinkPopup} style={styles}>
            <slot />
          </div>
        </ak-layer>
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
    /**
     * @description Target of an hyperlink-popup.
     * Selector or element on a page relative to which hyperlink-popup should be positioned
     * @memberof HyperlinkPopup
     * @instance
     * @type String
     * @example @html <ak-editor-hyperlink-popup target="#target"></ak-editor-hyperlink-popup>
     * @example @js dialog.target = document.body.querySelector('#target');
     * @example @js dialog.target = '#target'
     */
    target: {
      attribute: true,
    },
    /**
     * @description Constrain an hyperlink-popup to a scrollable parent or the window
     * @memberof HyperlinkPopup
     * @instance
     * @default 'window'
     * @type String
     * @example @html <ak-editor-hyperlink-popup constrain="scrollParent"></ak-editor-hyperlink-popup>
     * @example @js dialog.constrain = 'scrollParent'
     */
    constrain: enumeration(CONSTRAIN_ATTRIBUTE_ENUM)({
      attribute: true,
    }),
    /**
     * @description Box-shadow style for the hyperlink-popup
     * @memberof HyperlinkPopup
     * @instance
     * @type String
     * @example @html <ak-editor-hyperlink-popup box-shadow="0 0 10px 10px #f0f0f0"></ak-editor-hyperlink-popup>
     * @example @js dialog.boxShadow = '0 0 10px 10px #f0f0f0'
     */
    boxShadow: prop.string({
      attribute: true,
    }),
    /**
     * @description Border-radius style for the hyperlink-popup
     * @memberof HyperlinkPopup
     * @instance
     * @type String
     * @example @html <ak-editor-hyperlink-popup border-radius="3px"></ak-editor-hyperlink-popup>
     * @example @js dialog.borderRadius = '3px'
     */
    borderRadius: prop.string({
      attribute: true,
    }),
    /**
     * @description Padding style for the hyperlink-popup
     * @memberof HyperlinkPopup
     * @instance
     * @type String
     * @example @html <ak-editor-hyperlink-popup padding="3px"></ak-editor-hyperlink-popup>
     * @example @js dialog.padding = '3px'
     */
    padding: prop.string({
      attribute: true,
    }),

    positioned: prop.boolean({
      attribute: true,
    }),
  },
};

export default define('ak-editor-hyperlink-popup', definition);
