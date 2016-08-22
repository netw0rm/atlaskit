import 'style!../host.less';
import shadowStyles from './pf-resourced-mention-list-shadow.less';
import { localProp } from './skate-local-props';
import { define, vdom, prop, props } from 'skatejs';
import MentionList from './pf-mention-list';
import debug from '../util/logger';
import uniqueId from '../util/id';

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

function unsubscribeUpdates(elem, resourceProvider) {
  if (resourceProvider) {
    resourceProvider.unsubscribe(elem._subscriberKey);
  }
}

function subscribeUpdates(elem, resourceProvider) {
  if (resourceProvider) {
    resourceProvider.subscribe(elem._subscriberKey, elem._filterChange);
  }
}

function unsubscribePresenceUpdates(elem, presenceProvider) {
  if (presenceProvider) {
    presenceProvider.unsubscribe(elem._subscriberKey);
  }
}

function subscribePresenceUpdates(elem, presenceProvider) {
  if (presenceProvider) {
    presenceProvider.subscribe(elem._subscriberKey, elem._presenceUpdate);
  }
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

    _updateQuery(query) {
      if (this.resourceProvider) {
        this.resourceProvider.filter(query);
      }
    },

    _filterChange(mentions) {
      // Retain known presence
      const currentPresences = extractPresences(this.mentions);
      props(this, {
        mentions: applyPresence(mentions, currentPresences),
      });
      this._refreshPresences(mentions);
    },

    _presenceUpdate(presences) {
      props(this, {
        mentions: applyPresence(this.mentions, presences),
      });
    },

    _refreshPresences(mentions) {
      if (this.presenceProvider) {
        const ids = mentions.map((mention) => mention.id);
        this.presenceProvider.refreshPresence(ids);
      }
    },
  },

  created(elem) {
    elem._subscriberKey = uniqueId('pf-resourced-mention-list');
    elem._filterChange = elem._filterChange.bind(elem);
    elem._presenceUpdate = elem._presenceUpdate.bind(elem);
    elem._updateQuery('');
  },

  detached(elem) {
    if (elem.refWorkaround) {
      elem.refWorkaround(null);
    }
  },

  render(elem) {
    debug('pf-resourced-mention-list.render', elem.mentions.length);

    return (
      <div>
        <style>{shadowStyles.toString()}</style>
        <MentionList
          mentions={elem.mentions}
          refWorkaround={(ref) => { elem._mentionListRef = ref; }}
        />
      </div>
    );
  },

  props: {
    resourceProvider: localProp.object({
      set(elem, data) {
        unsubscribeUpdates(elem, data.oldValue);
        subscribeUpdates(elem, data.newValue);
        if (typeof elem.query === 'string') {
          elem._updateQuery(elem.query);
        }
      },
    }),
    presenceProvider: localProp.object({
      set(elem, data) {
        unsubscribePresenceUpdates(elem, data.oldValue);
        subscribePresenceUpdates(elem, data.newValue);
      },
    }),

    // Internal state...
    // TODO use symbols
    mentions: prop.array({
      default: [],
      initial: [],
    }),
    query: prop.string({
      default: '',
      set(elem, data) {
        elem._updateQuery(data.newValue);
      },
    }),
    refWorkaround: localProp.reference(),
  },
});
