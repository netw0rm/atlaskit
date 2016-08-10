import 'style!../host.less';
import shadowStyles from './pf-mention-picker-shadow.less';
import { localProp } from './skate-local-props';
import { define, vdom, prop, state } from 'skatejs';
import InlineDialog from 'ak-inline-dialog';
import ResourcedMentionList from './pf-resourced-mention-list';

export default define('pf-mention-picker', {
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
    const { target, position } = elem;
    const { resourceProvider, presenceProvider, query } = elem;
    const style = {
      display: elem.visible ? 'block' : 'none',
    };

    if (target) {
      return (
        <div style={style}>
          <style>{shadowStyles.toString()}</style>
          <InlineDialog
            target={target}
            position={position}
            open={elem.visible}
            padding="0"
          >
            <ResourcedMentionList
              resourceProvider={resourceProvider}
              presenceProvider={presenceProvider}
              query={query}
              ref={(ref) => { elem._mentionListRef = ref; }}
            />
          </InlineDialog>
        </div>
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
    query: prop.string({
      attribute: true,
    }),

    // ak-inline-dialog
    target: prop.string({
      attribute: true,
    }),
    position: prop.string({
      attribute: true,
    }),
  },
});
