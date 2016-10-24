import { define, vdom, prop } from 'skatejs';

import 'style!../host.less';
import shadowStyles from './pf-resourced-mention-list-shadow.less';
import MentionList from './pf-mention-list';
import debug from '../util/logger';
import hasChanges from '../util/has-changes';
import uniqueId from '../util/id';
import {
  selected as selectedEvent
} from '../internal/index.events';

function applyPresence(mentions, presences) {
  const updatedMentions = [];
  for (let i = 0; i < mentions.length; i++) {
    const mention = Object.assign({}, mentions[i]);
    const presence = presences[mention.id];
    if (presence) {
      mention.presence = presence;
    }
    updatedMentions.push(mention);
  }
  return updatedMentions;
}

function extractPresences(mentions) {
  const presences = {};
  for (let i = 0; i < mentions.length; i++) {
    const mention = mentions[i];
    if (mention.presence) {
      presences[mention.id] = mention.presence;
    }
  }
  return presences;
}

export default define('pf-resourced-mention-list', {
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
      // Retain known presence
      debug('pf-resourced-mentions-list._filterChange', mentions && mentions.length);
      const currentPresences = extractPresences(this._mentions);
      this._showError = false;
      this._mentions = applyPresence(mentions, currentPresences);
      this._refreshPresences(mentions);
    },

    _filterError(error) {
      debug('pf-resourced-mentions-list._filterError', error);
      this._showError = true;
    },

    _presenceUpdate(presences) {
      this._mentions = applyPresence(this._mentions, presences);
    },

    _refreshPresences(mentions) {
      if (this.presenceProvider) {
        const ids = mentions.map(mention => mention.id);
        this.presenceProvider.refreshPresence(ids);
      }
    },

    _notifySelection(event) {
      this.resourceProvider.recordMentionSelection(event.detail);
    }
  },

  created(elem) {
    elem._subscriberKey = uniqueId('pf-resourced-mention-list');
    elem._filterChange = elem._filterChange.bind(elem);
    elem._filterError = elem._filterError.bind(elem);
    elem._presenceUpdate = elem._presenceUpdate.bind(elem);
    elem._notifySelection = elem._notifySelection.bind(elem);
    elem._showError = false;
  },

  attached(elem) {
    elem.addEventListener(selectedEvent, elem._notifySelection);
  },

  detached(elem) {
    
    elem.removeEventListener(selectedEvent, elem._notifySelection);
  },

  render(elem) {
    debug('pf-resourced-mention-list.render', elem._mentions.length);

    return (
      <div>
        <style>{shadowStyles.toString()}</style>
        <MentionList
          mentions={elem._mentions}
          showError={elem._showError}
          ref={(ref) => { elem._mentionListRef = ref; }}
        />
      </div>
    );
  },

  updated(elem, prevProps = {}) {
    const resourceProviderChanged = elem.resourceProvider !== prevProps.resourceProvider;
    const queryChanged = elem.query !== prevProps.query;
    const canFilter = (typeof elem.query === 'string') && elem.resourceProvider;
    const shouldFilter = canFilter && (queryChanged || resourceProviderChanged);

    // resource provider
    if (resourceProviderChanged) {
      if (prevProps.resourceProvider) {
        prevProps.resourceProvider.unsubscribe(elem._subscriberKey);
      }
      if (elem.resourceProvider) {
        elem.resourceProvider.subscribe(elem._subscriberKey, elem._filterChange, elem._filterError);
      }
    }

    // presence provider
    if (elem.presenceProvider !== prevProps.presenceProvider) {
      if (prevProps.presenceProvider) {
        prevProps.presenceProvider.unsubscribe(elem._subscriberKey);
      }
      if (elem.presenceProvider) {
        elem.presenceProvider.subscribe(elem._subscriberKey, elem._presenceUpdate);
      }
    }

    if (shouldFilter) {
      elem.resourceProvider.filter(elem.query);
    }

    return hasChanges(elem, prevProps);
  },

  props: {
    resourceProvider: {},
    presenceProvider: {},
    query: prop.string({ attribute: true, default: () => '' }),

    // Internal state
    _mentions: prop.array(),
    _showError: prop.boolean(),
  },
});
