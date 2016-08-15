import 'style!../host.less';
import shadowStyles from './pf-resourced-mention-list-shadow.less';
import { localProp } from './skate-local-props';
import { define, vdom, prop, props } from 'skatejs';
import MentionList from './pf-mention-list';

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
    resourceProvider.unsubscribe(elem._filterChange);
  }
}

function subscribeUpdates(elem, resourceProvider) {
  if (resourceProvider) {
    resourceProvider.subscribe(elem._filterChange);
  }
}

function unsubscribePresenceUpdates(elem, presenceProvider) {
  if (presenceProvider) {
    presenceProvider.unsubscribe(elem._presenceUpdate);
  }
}

function subscribePresenceUpdates(elem, presenceProvider) {
  if (presenceProvider) {
    presenceProvider.subscribe(elem._presenceUpdate);
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
    elem._updateQuery('');
    elem._filterChange = elem._filterChange.bind(elem);
    elem._presenceUpdate = elem._presenceUpdate.bind(elem);
  },

  detached(elem) {
    unsubscribeUpdates(elem, elem.resourceProvider);
    unsubscribePresenceUpdates(elem, elem.presenceProvider);
    if (elem.ref) {
      elem.ref(null);
    }
  },

  render(elem) {
    return (
      <div>
        <style>{shadowStyles.toString()}</style>
        <MentionList
          mentions={elem.mentions}
          ref={(ref) => { elem._mentionListRef = ref; }}
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
    ref: localProp.reference(),

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
  },
});
