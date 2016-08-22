/** @jsx vdom */
import 'style!./host.less';
import { enumeration, KeyPressHandler } from 'akutil-common';
import { vdom, prop, define, emit } from 'skatejs';
import shadowStyles from './shadow.less';
import Layer, { POSITION_ATTRIBUTE_ENUM, CONSTRAIN_ATTRIBUTE_ENUM } from 'ak-layer';
import Blanket from 'ak-blanket';

let keyPress;
function closeDialog(elem) {
  return () => {
    elem.open = false;
  };
}

function renderBlanketIfNeeded(elem) {
  if (elem.hasBlanket) {
    return (
      <Blanket
        tinted={elem.isBlanketTinted}
        clickable={elem.isBlanketClickable}
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
    keyPress = new KeyPressHandler('ESCAPE', closeDialog(elem));
    window.addEventListener('ak-blanket-click', closeDialog(elem));
  },
  detached(elem) {
    keyPress.destroy();
    window.removeEventListener('ak-blanket-click', closeDialog(elem));
  },
  render(elem) {
    if (elem.open === true) {
      emit(elem, 'ak-after-open');
    } else if (elem.open === false) {
      emit(elem, 'ak-after-close');
    }
    // if (elem.open === false) {
    //   return '';
    // }

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
      <div>
        {renderBlanketIfNeeded(elem)}
        <Layer
          position={elem.position}
          attachment={elem.constrain}
          target={elem.target}
          boundariesElement={elem.boundariesElement}
          enableFlip={elem.enableFlip}
        >
          <style>{shadowStyles.toString()}</style>
          <div className={shadowStyles.locals.inlineDialogContainer} style={styles}>
            <slot />
          </div>
        </Layer>
      </div>
    );
  },
  props: {
    /* eslint-disable max-len  */
    /**
     * @description Position of an inline-dialog relative to it's target.
     * The position attribute takes two positional arguments in the format`position="edge edge-position"`,
     * where `edge` specifies what edge to align the inline dialog to, and `edge-position` specifies where on that edge the dialog should appear.
     * Refer to the table below for examples:
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
    /* eslint-enable max-len */
    position: enumeration(POSITION_ATTRIBUTE_ENUM)({
      attribute: true,
    }),
    /**
     * @description Controls visibility of an inline-dialog. Dialog is invisible by default.
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
     * Selector or element on a page relative to which inline-dialog should be positioned
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
     * @description Constrain an inline-dialog to a scrollable parent or the window
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
     * @description If dialog has a blanket underneath or not. By default it has.
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
     * @description If click on the blanket dismisses the dialog. By default it is.
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
     * @description Is blanket grey with opacity or transparent. By default it's transparent.
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
     * @description Is blanket is closable by pressing the 'escape' button. By default it is.
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
    boundariesElement: { attribute: true },
    enableFlip: prop.boolean({
      attribute: true,
    }),
  },
});
