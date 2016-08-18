import 'style!../host.less';
import shadowStyles from './pf-mention-picker-shadow.less';
import { localProp } from './skate-local-props';
import { define, vdom, prop, props } from 'skatejs';
import InlineDialog from 'ak-inline-dialog';
import ResourcedMentionList from './pf-resourced-mention-list';
import debug from '../util/logger';

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
      props(this, {
        _visible: mentions.length > 0,
      });
    },
  },

  created(elem) {
    elem.visible = false;
    elem._filterChange = elem._filterChange.bind(elem);
  },

  detached(elem) {
    if (elem.resourceProvider) {
      elem.resourceProvider.unsubscribe(elem);
    }
  },

  render(elem) {
    const { target, position } = elem;
    const { resourceProvider, presenceProvider, query } = elem;
    const style = {
      display: elem._visible ? 'block' : 'none',
    };

    debug('pf-mention-picker.render', query);

    if (target) {
      return (
        <div style={style}>
          <style>{shadowStyles.toString()}</style>
          <InlineDialog
            target={target}
            position={position}
            open={elem._visible}
            padding="0"
            hasBlanket={false}
          >
            <ResourcedMentionList
              resourceProvider={resourceProvider}
              presenceProvider={presenceProvider}
              query={query}
              refWorkaround={(ref) => { elem._mentionListRef = ref; }}
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
          data.oldValue.unsubscribe(elem);
        }
        if (data.newValue) {
          data.newValue.subscribe(elem, elem._filterChange);
        }
      },
    }),
    presenceProvider: localProp.object(),
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
    // internal
    _visible: prop.boolean(),
  },
});
