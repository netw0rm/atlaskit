/** @jsx vdom */
/* eslint react/no-unknown-property: 0 */

import { getPositionFromClasses } from 'akutil-common';
import { vdom, prop, define, symbols } from 'skatejs';
import headStyles from 'style!./host.less';
import shadowStyles from './shadow.less';
import 'ak-layer';

const definition = {
  attached(elem) {
    elem.className = headStyles.editorkitHyperlinkPopup; // eslint-disable-line no-param-reassign
  },
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
        attachment={elem.attachment}
        target={elem.target}
      >
        <style>{shadowStyles.toString()}</style>
        <div class={shadowStyles.locals.hyperlinkPopup} style={styles}>
          <slot />
        </div>
      </ak-layer>
    );
  },
  props: {
    position: prop.string({ attribute: true, default: 'bottom center' }),
    open: prop.boolean({ attribute: true, default: false }),
    target: { attribute: true },
    attachment: prop.string({ attribute: true, default: 'window' }),
    renderElementTo: { attribute: true },
  },
};

export default define('ak-editor-hyperlink-popup', definition);
