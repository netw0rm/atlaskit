/** @jsx vdom */
import { enumeration, KeyPressHandler } from 'akutil-common';
import { vdom, prop, define, emit } from 'skatejs';
import Layer, { POSITION_ATTRIBUTE_ENUM, CONSTRAIN_ATTRIBUTE_ENUM } from 'ak-layer';
import Blanket from 'ak-blanket';

import shadowStyles from './shadow.less';
import * as events from './internal/events';


const closeHandlerSymbol = Symbol('closeHandlerSymbol');
const keyPressHandlerSymbol = Symbol('keyPressHandlerSymbol');

function renderBlanketIfNeeded(elem) {
  if (elem.hasBlanket) {
    return (
      <Blanket
        tinted={elem.isBlanketTinted}
        clickable={elem.isBlanketClickable}
        on-activate={elem[closeHandlerSymbol]}
      />
    );
  }

  return '';
}

/**
 * @description The definition for the InlineDialog component.
 * @class InlineDialog
 * @example @html <ak-inline-dialog target="#target"></ak-inline-dialog>
 * @example @js import InlineDialog from 'ak-inline-dialog';
 * const myDialog = new InlineDialog();
 */
export default define('ak-inline-dialog', {
  attached(elem) {
    elem[closeHandlerSymbol] = () => (elem.open = false);
    elem[keyPressHandlerSymbol] = new KeyPressHandler('ESCAPE', elem[closeHandlerSymbol]);
  },
  detached(elem) {
    elem[keyPressHandlerSymbol].destroy();
  },
  render(elem) {
    if (typeof elem.open === 'boolean') {
      if (elem.open) {
        emit(elem, events.afterOpen);
      } else {
        emit(elem, events.afterClose);
      }
    }
    // do not render anything if the dialog is hidden
    // helps with avoiding flashing
    if (!elem.open) {
      return null;
    }

    const styles = {};
    if (elem.boxShadow) {
      styles.boxShadow = elem.boxShadow;
    }
    if (elem.padding) {
      styles.padding = elem.padding;
    }
    if (elem.borderColor) {
      styles.borderColor = elem.borderColor;
    }
    if (elem.borderRadius) {
      styles.borderRadius = elem.borderRadius;
    }
    return (
      <div>
        {renderBlanketIfNeeded(elem)}
        <Layer
          target={elem.target}
          position={elem.position}
          boundariesElement={elem.boundariesElement}
          enableFlip={elem.enableFlip}
          ref={(layerElem) => {
            elem.layer = layerElem;
          }}
        >
          <style>{shadowStyles.toString()}</style>
          <div className={shadowStyles.locals.inlineDialogContainer} style={styles}>
            <slot />
          </div>
        </Layer>
      </div>
    );
  },
  prototype: {
    /**
     * @description Forces the dialog to recalculate and reposition itself on the page. This should
     * not usually be required as any modifications to the dialog itself should also cause
     * reposition to be called.
     * @memberof InlineDialog
     * @instance
     * @return {InlineDialog}
     * @example @js inlineDialog.reposition();
    */
    reposition() {
      if (this.layer) {
        this.layer.reposition();
      }

      return this;
    },
  },
  props: {
    /**
     * @description Position of an inline-dialog relative to it’s target.
     * The position attribute takes two positional arguments in the
     * format`position="edge edge-position"`, where `edge` specifies the edge you have to align
     * the inline dialog to, and `edge-position` specifies where on that edge the dialog should
     * appear.
     * Checkout the examples in the following table:
     *
     * |             | top left    | top center    | top right    |              |
     * |-------------|-------------|---------------|--------------|--------------|
     * | left top    |             |               |              | right top    |
     * | left middle |             |    target     |              | right middle |
     * | left bottom |             |               |              | right bottom |
     * |             | bottom left | bottom center | bottom right |              |
     * @memberof InlineDialog
     * @instance
     * @default right middle
     * @type {string}
     * @example @html <ak-inline-dialog position="top left"></ak-inline-dialog>
     * @example @js dialog.position = 'top left';
     */
    position: enumeration(POSITION_ATTRIBUTE_ENUM)({
      attribute: true,
    }),
    /**
     * @description Controls the visibility of an inline-dialog. It is invisible by default.
     * @memberof InlineDialog
     * @instance
     * @default false
     * @type Boolean
     * @example @html <ak-inline-dialog open></ak-inline-dialog>
     * @example @js dialog.open = true;
     */
    open: prop.boolean({
      attribute: true,
    }),
    /**
     * @description Target of an inline-dialog.
     * Selector or element on a page relative to which the inline-dialog should be positioned
     * @memberof InlineDialog
     * @instance
     * @type String
     * @example @html <ak-inline-dialog target="#target"></ak-inline-dialog>
     * @example @js dialog.target = document.body.querySelector('#target');
     * @example @js dialog.target = '#target'
     */
    target: {
      attribute: true,
    },
    /**
     * @description Constrain an inline-dialog to a scrollable parent or to the window
     * @memberof InlineDialog
     * @instance
     * @default 'window'
     * @type String
     * @example @html <ak-inline-dialog constrain="scrollParent"></ak-inline-dialog>
     * @example @js dialog.constrain = 'scrollParent'
     */
    constrain: enumeration(CONSTRAIN_ATTRIBUTE_ENUM)({
      attribute: true,
    }),
    /**
     * @description Box-shadow style for the inline-dialog
     * @memberof InlineDialog
     * @instance
     * @type String
     * @example @html <ak-inline-dialog box-shadow="0 0 10px 10px #f0f0f0"></ak-inline-dialog>
     * @example @js dialog.boxShadow = '0 0 10px 10px #f0f0f0'
     */
    boxShadow: prop.string({
      attribute: true,
    }),
    /**
     * @description Border-color style for the inline-dialog
     * @memberof InlineDialog
     * @instance
     * @type String
     * @example @html <ak-inline-dialog border-color="red"></ak-inline-dialog>
     * @example @js dialog.borderColor = 'red'
     */
    borderColor: prop.string({
      attribute: true,
    }),
    /**
     * @description Border-radius style for the inline-dialog
     * @memberof InlineDialog
     * @instance
     * @type String
     * @example @html <ak-inline-dialog border-radius="3px"></ak-inline-dialog>
     * @example @js dialog.borderRadius = '3px'
     */
    borderRadius: prop.string({
      attribute: true,
    }),
    /**
     * @description Padding style for the inline-dialog
     * @memberof InlineDialog
     * @instance
     * @type String
     * @example @html <ak-inline-dialog padding="3px"></ak-inline-dialog>
     * @example @js dialog.padding = '3px'
     */
    padding: prop.string({
      attribute: true,
    }),
    /**
     * @description Defines whether a dialog has a blanket underneath or not.
     * It does have a blanket underneath by default.
     * @memberof InlineDialog
     * @instance
     * @type Boolean
     * @default true
     * @example @html <ak-inline-dialog has-blanket="true"></ak-inline-dialog>
     * @example @js dialog.hasBlanket = true
     */
    hasBlanket: prop.boolean({
      attribute: true,
      default: true,
    }),
    /**
     * @description If there is a click on the blanket, it dismisses the dialog.
     * The blanket is clickable by default.
     * @memberof InlineDialog
     * @instance
     * @type Boolean
     * @default true
     * @example @html <ak-inline-dialog is-blanket-clickable="true"></ak-inline-dialog>
     * @example @js dialog.isBlanketClickable = true
     */
    isBlanketClickable: prop.boolean({
      attribute: true,
      default: true,
    }),
    /**
     * @description Defines if the blanket is grey with opacity or transparent.
     * It‘s transparent by default.
     * @memberof InlineDialog
     * @instance
     * @type Boolean
     * @default false
     * @example @html <ak-inline-dialog is-blanket-tinted="true"></ak-inline-dialog>
     * @example @js dialog.isBlanketTinted = true
     */
    isBlanketTinted: prop.boolean({
      attribute: true,
    }),
    /**
     * @description Close the blanket by pressing the “escape” button. It‘s closable by default.
     * @memberof InlineDialog
     * @instance
     * @type Boolean
     * @default true
     * @example @html <ak-inline-dialog is-closable-on-esc="true"></ak-inline-dialog>
     * @example @js dialog.isClosableOnEsc = true
     */
    isClosableOnEsc: prop.boolean({
      attribute: true,
    }),
    /**
     * @description Element to act as a boundary for the Inline-Dialog.
     * The Inline-Dialog will not sit outside this element if it can help it.
     * If, through it's normal positoning, it would end up outside the boundary the Dialog
     * will flip positions if the enableFlip prop is set.
     * Can either be an element or a selector of an element.
     * If not set the boundary will be the current viewport.
     * @memberof InlineDialog
     * @instance
     * @type HTMLElement | String
     * @example @html <ak-inline-dialog enable-flip boundaries-element="#container">
     * </ak-inline-dialog>
     * @example @js inlineDialog.boundariesElement = document.body.querySelector('#container');
     * @example @js inlineDialog.enableFlip = true;
     */
    boundariesElement: { attribute: true },
    /**
     * @description Sets whether an Inline-Dialog will flip it's position if there is not enough
     * space in the requested position.
     * i.e. if an Inline-Dialog is set to position="top middle" but placing it there would cause
     * it to be outside the viewport (or the boundariesElement if that is set)
     * the Inline-Dialog will instead be positioned in "bottom middle".
     * @memberof InlineDialog
     * @instance
     * @type Boolean
     * @example @html <ak-inline-dialog enable-flip></ak-inline-dialog>
     * @example @js inlineDialog.enableFlip = true;
     */
    enableFlip: prop.boolean({
      attribute: true,
    }),
  },
});

export { events };
