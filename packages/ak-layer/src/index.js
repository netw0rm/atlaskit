/** @jsx vdom */

import { vdom, prop } from 'skatejs';
import { Alignment } from 'akutil-common';
import './ak-layer-impl';

export default {
  props: {
    position: prop.string({ attribute: true, default: 'right middle' }),
    attachment: prop.string({ attribute: true, default: 'window' }),
    target: prop.string({ attribute: true }),
    renderElementTo: prop.string({ attribute: true }),
    open: prop.string({
      attribute: true,
      set(elem) {
        if (elem.alignment) {
          elem.alignment.reposition();
        }
      },
    }),
  },
  attached(elem) {
    elem.akLayerImpl = elem.getElementsByTagName('ak-layer-impl')[0];
    if (!elem.alignment) {
      elem.alignment = new Alignment(elem.akLayerImpl);  // eslint-disable-line no-param-reassign
    } else {
      elem.alignment.enable();
      elem.alignment.update(elem.akLayerImpl);
    }
  },
  detached(elem) {
    if (elem.alignment) {
      elem.alignment.destroy();
    }
  },
  render(elem) {
    if (elem.alignment) {
      elem.alignment.update(elem.akLayerImpl);
    }

    return (
      <div>
        <ak-layer-impl position={elem.position} attachment={elem.attachment} target={elem.target} renderElementTo={elem.renderElementTo}>
          <slot name="layer" />
        </ak-layer-impl>
      </div>
    );
  },
};
