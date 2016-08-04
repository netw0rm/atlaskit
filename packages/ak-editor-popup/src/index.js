/** @jsx vdom */
/* eslint react/no-unknown-property: 0 */
import hostStyle from './host.less';
import { vdom, prop, define } from 'skatejs';
import cx from 'classnames';
import shadowStyles from './shadow.less';
import Layer, { POSITION_ATTRIBUTE_ENUM, CONSTRAIN_ATTRIBUTE_ENUM } from 'ak-layer'; // eslint-disable-line no-unused-vars, max-len

/**
 * @description The definition for the Popup component.
 * @class Popup
 * @example @html <ak-editor-popup target="#target"></ak-editor-popup>
 * @example @js import Popup from 'ak-editor-popup';
 * const myPopup = new Popup();
 *
 */
const definition = {
  created(elem) {
    elem.close = (e) => {
      let isDescendant = false;
      let p = e.target;

      while (p) {
        if (p === elem) {
          isDescendant = true;
          break;
        }
        p = p.parentElement;
      }

      if (!isDescendant) {
        elem.open = false;
      }
    };
  },
  attached(elem) {
    elem.context.addEventListener('click', elem.close, true);
  },
  detached(elem) {
    elem.context.removeEventListener('click', elem.close, true);
  },
  render(elem) {
    const styles = {};

    return (
      <div
        class={cx({
          [hostStyle.locals.akEditorPopup]: !elem.open,
        })}
      >
        <style>{hostStyle.toString()}</style>
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
          <div class={shadowStyles.locals.popup} style={styles}>
            <slot />
          </div>
        </ak-layer>
      </div>
    );
  },
  props: {
    /* eslint-disable max-len  */
    /**
     * @description Controls visibility of an -popup. Dialog is invisible by default.
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
    /**
     * @description Target of an -popup.
     * Selector or element on a page relative to which -popup should be positioned
     * @memberof Popup
     * @instance
     * @type String
     * @example @html <ak-editor-popup target="#target"></ak-editor-popup>
     * @example @js dialog.target = document.body.querySelector('#target');
     * @example @js dialog.target = '#target'
     */
    target: {
      attribute: true,
    },
    /**
     * @description A global dom that listens to the close event.
     * @memberof Popup
     * @instance
     * @type DOM
     * @example @js dialog.context = document.body.querySelector('#target');
     * @example @js dialog.context = document;
     */
    context: { attribute: true, default: document },
  },
};

export default define('ak-editor-popup', definition);
