import 'style!../host.less';
import shadowStyles from './pf-mention-picker-shadow.less';
import { localProp } from './skate-local-props';
import { define, vdom, prop, props } from 'skatejs';
import InlineDialog from 'ak-inline-dialog';
import ResourcedMentionList from './pf-resourced-mention-list';
import debug from '../util/logger';
import uniqueId from '../util/id';

function updateDialogPosition() {
  this._dialog.reposition();
}

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
    elem._subscriberKey = uniqueId('pf-mention-picker');
    elem._filterChange = elem._filterChange.bind(elem);
  },

  attached(elem) {
    document.addEventListener('pf-mention-list-rendered', updateDialogPosition.bind(elem));
  },

  detached(elem) {
    if (elem.resourceProvider) {
      elem.resourceProvider.unsubscribe(elem);
    }
    document.removeEventListener('pf-mention-list-rendered', updateDialogPosition);
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
            ref={(el) => {
              elem._dialog = el;
            }}
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

  rendered(elem) {
    // since the content of the dialog is dynamic it needs to be repositioned manually
    // after this content was generated
    if (elem._dialog && elem._dialog.reposition) {
      elem._dialog.reposition();
    }
  },

  props: {
    // pf-resourced-mention-list
    resourceProvider: localProp.object({
      set(elem, data) {
        if (data.oldValue) {
          data.oldValue.unsubscribe(elem._subscriberKey);
        }
        if (data.newValue) {
          data.newValue.subscribe(elem._subscriberKey, elem._filterChange);
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
