import headStyles from 'style!../host.less'; // eslint-disable-line no-unused-vars, import/no-unresolved, max-len
import pfResourcedMentionList from './pf-resourced-mention-list'; // eslint-disable-line no-unused-vars, max-len
import { localProp } from './skate-local-props';

import akInlineDialog from 'ak-inline-dialog'; // eslint-disable-line no-unused-vars
import { define, vdom, prop, emit, state } from 'skatejs'; // eslint-disable-line no-unused-vars

const definition = {

  prototype: {
    selectNext() {
      if (this._mentionListRef) {
        this._mentionListRef.selectNext();
      }
    },

    selectPrevious() {
      if (this._mentionListRef) {
        this._mentionListRef.selectPrevious();
      }
    },

    chooseCurrentSelection() {
      if (this._mentionListRef) {
        this._mentionListRef.chooseCurrentSelection();
      }
    },

    _filterChange(mentions) {
      state(this, {
        visible: mentions.length > 0,
      });
    },
  },

  created(elem) {
    elem.visible = false;
    elem._filterChange = elem._filterChange.bind(elem);
  },

  detached(elem) {
    if (elem.resourceProvider) {
      elem.resourceProvider.unsubscribe(elem._filterChange);
    }
    if (elem.ref) {
      elem.ref(null);
    }
  },

  render(elem) {
    const { target, position, renderElementTo } = elem;
    const { resourceProvider, presenceProvider, query } = elem;

    if (target) {
      return (
        <ak-inline-dialog
          target={target}
          open={elem.visible ? 'true' : 'false'}
          position={position}
          renderElementTo={renderElementTo}
          padding="0"
        >
          <pf-resourced-mention-list
            resourceProvider={resourceProvider}
            presenceProvider={presenceProvider}
            query={query}
            ref={(ref) => { elem._mentionListRef = ref; }}
          />
        </ak-inline-dialog>
      );
    }
    return null;
  },

  props: {
    // pf-resourced-mention-list
    resourceProvider: localProp.object({
      set(elem, data) {
        if (data.oldValue) {
          data.oldValue.unsubscribe(elem._filterChange);
        }
        if (data.newValue) {
          data.newValue.subscribe(elem._filterChange);
        }
      },
    }),
    presenceProvider: localProp.object(),
    ref: localProp.reference(),
    query: prop.string(),
    // ak-inline-dialog
    target: prop.string(),
    position: prop.string(),
    renderElementTo: prop.string(),
  },
};

/* The constructor for our component */
export default define('pf-mention-picker', definition);

export { definition };
