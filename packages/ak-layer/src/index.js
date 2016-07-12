/** @jsx vdom */

import { vdom, prop } from 'skatejs';
import { Alignment } from 'akutil-common';
import './ak-layer-impl';
import headStyles from 'style!./host.less'; // eslint-disable-line import/no-unresolved, max-len
import shadowStyles from './shadow.less';

export default {
  props: {
    position: prop.string({
      attribute: true,
      default: 'right middle',
      set(elem, data) {
        elem.getElementsByTagName('ak-layer-impl')[0].position = data.newValue;
      }
    }),
    attachment: prop.string({
      attribute: true,
      default: 'window',
      set(elem, data) {
        elem.getElementsByTagName('ak-layer-impl')[0].attachment = data.newValue;
      }
    }),
    target: prop.string({
      attribute: true,
      set(elem, data) {
        elem.getElementsByTagName('ak-layer-impl')[0].target = data.newValue;
      }
    }),
    renderElementTo: prop.string({
      attribute: true,
      set(elem, data) {
        elem.getElementsByTagName('ak-layer-impl')[0].renderElementTo = data.newValue;
      }
    }),
    // open: prop.string({
    //   attribute: true,
    //   set(elem, data) {
    //     elem.getElementsByTagName('ak-layer-impl')[0].setAttribute('open', data.newValue);
    //     if (elem.alignment) {
    //       elem.alignment.reposition();
    //     }
    //   },
    // }),
  },
  attached(elem) {
    elem.akLayerImpl = elem.getElementsByTagName('ak-layer-impl')[0];
    // elem.akLayerImpl.position = elem.position;
    // elem.akLayerImpl.attachment = elem.attachment;
    // elem.akLayerImpl.target = elem.target;
    // elem.akLayerImpl.renderElementTo = elem.renderElementTo;

    if (!elem.alignment) {
      debugger;
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

    //position={elem.position} attachment={elem.attachment} target={elem.target} renderElementTo={elem.renderElementTo}
    return (
      <div>
        <style>{shadowStyles.toString()}</style>
        <ak-layer-impl>
          <slot name="layer" />
        </ak-layer-impl>
      </div>
    );
  },
};
