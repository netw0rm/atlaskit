import { define, vdom, prop } from 'skatejs';
import InlineDialog from 'ak-inline-dialog';

import 'style!../host.less';
import shadowStyles from './pf-mention-picker-shadow.less';
import ResourcedMentionList from './pf-resourced-mention-list';
import debug from '../util/logger';
import hasChanges from '../util/has-changes';
import uniqueId from '../util/id';
import { mentionListRendered as mentionListRenderedEvent } from '../internal/index.events';

const styles = shadowStyles.locals;

/**
* @class MentionPicker
*/
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
      debug('pf-mention-picker._filterChange', mentions.length);
      this._visible = mentions.length > 0;
    },

    _filterError(error) {
      debug('pf-mention-picker._filterError', error);
      this._visible = true;
    },

    _updateDialogPosition(event) {
      if (event.target._dialog && event.target._dialog.reposition) {
        event.target._dialog.reposition();
      }
    },
  },

  created(elem) {
    elem._subscriberKey = uniqueId('pf-mention-picker');
    elem._filterChange = elem._filterChange.bind(elem);
    elem._filterError = elem._filterError.bind(elem);
  },

  attached(elem) {
    document.addEventListener(mentionListRenderedEvent, elem._updateDialogPosition);
  },

  detached(elem) {
    if (elem.resourceProvider) {
      elem.resourceProvider.unsubscribe(elem._subscriberKey);
    }
    document.removeEventListener(mentionListRenderedEvent, elem._updateDialogPosition);
  },

  render(elem) {
    const { resourceProvider, presenceProvider, query, target, position } = elem;
    const style = {
      display: elem._visible ? 'block' : 'none',
    };

    const resourceMentionList = (
      <ResourcedMentionList
        resourceProvider={resourceProvider}
        presenceProvider={presenceProvider}
        query={query}
        ref={(ref) => { elem._mentionListRef = ref; }}
      />
    );

    let content;
    if (target) {
      content = (
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
          {resourceMentionList}
        </InlineDialog>
      );
    } else {
      content = (
        <div class={styles.noDialogContainer}>
          {resourceMentionList}
        </div>
      );
    }

    return (
      <div style={style}>
        <style>{shadowStyles.toString()}</style>
        {content}
      </div>
    );
  },

  rendered(elem) {
    // since the content of the dialog is dynamic it needs to be repositioned manually
    // after this content was generated
    if (elem._dialog && elem._dialog.reposition) {
      elem._dialog.reposition();
    }
  },

  updated(elem, prevProps = {}) {
    const resourceProviderChanged = elem.resourceProvider !== prevProps.resourceProvider;

    // resource provider
    if (resourceProviderChanged) {
      if (prevProps.resourceProvider) {
        prevProps.resourceProvider.unsubscribe(elem._subscriberKey);
      }
      if (elem.resourceProvider) {
        elem.resourceProvider.subscribe(elem._subscriberKey, elem._filterChange);
      }
    }

    return hasChanges(elem, prevProps);
  },

  props: {
    // pf-resourced-mention-list
    resourceProvider: {},
    presenceProvider: {},
    query: prop.string({ attribute: true, default: () => undefined }),

    // ak-inline-dialog
    target: prop.string({ attribute: true }),
    position: prop.string({ attribute: true }),

    // internal
    _visible: prop.boolean(),
  },
});
