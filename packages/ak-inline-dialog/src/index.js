/** @jsx vdom */
/* eslint react/no-unknown-property: 0 */
import 'style!./host.less';
import { getPositionFromClasses, enumeration } from 'akutil-common';
import { vdom, prop, define, symbols } from 'skatejs';
import shadowStyles from './shadow.less';
import Layer, { POSITION_ATTRIBUTE_ENUM, CONSTRAIN_ATTRIBUTE_ENUM } from 'ak-layer'; // eslint-disable-line no-unused-vars, max-len

/**
 * @description The definition for the InlineDialog component.
 * @class InlineDialog
 * @example @html <ak-inline-dialog target="#target"></ak-inline-dialog>
 * @example @js import InlineDialog from 'ak-inline-dialog';
 * const myDialog = new InlineDialog();
 *
 */
const definition = {
  observedAttributes: ['class'],
  attributeChanged(elem, data) {
    if (data.newValue) {
      const newPosition = getPositionFromClasses(data.newValue);
      if (newPosition && newPosition !== elem.actualPosition) {
        elem.actualPosition = newPosition; // eslint-disable-line no-param-reassign
      }
    }
  },
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

    if (elem[symbols.shadowRoot] && elem[symbols.shadowRoot].firstChild && elem[symbols.shadowRoot].firstChild.alignment) { // eslint-disable-line max-len
      elem[symbols.shadowRoot].firstChild.alignment.reposition();
    }

    return (
      <ak-layer
        open={elem.open}
        position={elem.position}
        attachment={elem.constrain}
        target={elem.target}
      >
        <style>{shadowStyles.toString()}</style>
        <div class={shadowStyles.locals.inlineDialogContainer} style={styles}>
          <slot />
        </div>
      </ak-layer>
    );
  },
  props: {
    /**
     * @description Position of an inline-dialog relative to it's target. One of:
     * |             | top left    | top center    | top right    |              |
     * |-------------|-------------|---------------|--------------|--------------|
     * | left top    |             |               |              | right top    |
     * | left middle |             |               |              | right middle |
     * | left bottom |             |               |              | right bottom |
     * |-------------|-------------|---------------|--------------|--------------|
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
      default: false,
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
     * @description Constrain an inline-dialog to a scrollParent or window
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
  },
};

export default define('ak-inline-dialog', definition);
