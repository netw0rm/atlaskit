/** @jsx vdom */
/* eslint react/no-unknown-property: 0 */
import './types';
import { prop, define, Component } from 'skatejs';
import Layer from 'ak-layer';
import hostStyle from './host.less';
import shadowStyles from './shadow.less';

// typescript removes unused var if we import it :(
const { vdom } = require('skatejs');

// TODO: remove after we generalize the editor into a common class
const knownEditorTagNames = [
  'AK-EDITOR-BITBUCKET',
  'AK-EDITOR-JIRQ',
  'AK-EDITOR-CQ',
  'AK-EDITOR-CONFLUENCE',
  'AK-EDITOR-HIPCHAT'
];

/**
 * @description The definition for the Popup component.
 * @class Popup
 * @example @html <ak-editor-popup target="#target"></ak-editor-popup>
 * @example @js import Popup from 'ak-editor-popup';
 * const myPopup = new Popup();
 */
export default define('ak-editor-popup', class AkEditorPopup extends Component {
  open: string;
  target: Node;

  static render(elem: AkEditorPopup) {
    if (!elem.open) {
      return null;
    }

    const parentEditorElement = AkEditorPopup._findParentEditor(elem);
    console.log('parentEditorElement', parentEditorElement);

    return (
      <div>
        <style>{hostStyle.toString()}</style>
        <Layer
          position="bottom center"
          target={elem.target}
          enable-flip
          boundariesElement={parentEditorElement}
        >
          <style>{shadowStyles.toString()}</style>
          <div className={shadowStyles.locals.popup}>
            <slot style={{ display: 'flex' }} />
          </div>
        </Layer>
      </div>
    );
  }

  /**
   * This method attempts to find the containing editor frame.
   * TODO: Refactor this method after we generalize the editor into a common class
   */
   static _findParentEditor(el: Node): Node | undefined {
    while (el = (el as ShadowRoot).host || el.parentNode) {
      for (let x = 0; x < knownEditorTagNames.length; x++ ){
        if (el.nodeName.indexOf(knownEditorTagNames[x]) === 0) {
          return el;
        }
      }

    }
  }

  static get props() {
    return {
      /**
       * @description Controls visibility of an -popup. Dialog is invisible by default.
       * @memberof Popup
       * @instance
       * @default false
       * @type Boolean
       * @example @html <ak-editor-popup open></ak-editor-popup>
       * @example @js dialog.open = true;
       */
      open: prop.boolean({attribute: true}),
      /**
       * @description Target of an -popup.
       * Selector or element on a page relative to which -popup should be positioned
       * @memberof Popup
       * @instance
       * @type Node|object
       * @example @html <ak-editor-popup target="#target"></ak-editor-popup>
       * @example @js dialog.target = document.body.querySelector('#target');
       * @example @js dialog.target = '#target'
       */
      target: {}
    };
  }
});
