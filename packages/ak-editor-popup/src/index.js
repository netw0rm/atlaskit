/** @jsx vdom */
/* eslint react/no-unknown-property: 0 */
import hostStyle from './host.less';
import { vdom, prop, define } from 'skatejs';
import cx from 'classnames';
import shadowStyles from './shadow.less';
import Layer from 'ak-layer';

/**
 * @description The definition for the Popup component.
 * @class Popup
 * @example @html <ak-editor-popup target="#target"></ak-editor-popup>
 * @example @js import Popup from 'ak-editor-popup';
 * const myPopup = new Popup();
 */
export default define('ak-editor-popup', {
  render(elem) {
    return (
      <div
        className={cx({
          [hostStyle.locals.akEditorPopup]: !elem.open,
        })}
      >
        <style>{hostStyle.toString()}</style>
        <Layer
          open={elem.open}
          position="bottom center"
          target={elem.target}
          onRender={layer => {
            if (elem.open && layer.alignment) {
              elem.positioned = true;
            }
          }}
        >
          <style>{shadowStyles.toString()}</style>
          <div className={shadowStyles.locals.popup}>
            <slot style={{ display: 'flex' }} />
          </div>
        </Layer>
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
    open: prop.boolean({ attribute: true }),
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
    target: { attribute: true },
  },
});
