import {
  Plugin,
  PluginKey,
  Transaction,
  Decoration,
  DecorationSet,
} from '../../../prosemirror';

import ProviderFactory from '../../../providerFactory';
import { Dispatch } from '../../event-dispatcher';
import {
  getSendableSelection,
  handleInit,
  handleConnection,
  handlePresence,
  handleTelePointer,
  applyRemoteData,
} from './actions';
import { getAvatarColor, findPointer } from './utils';
import { CollabEditProvider } from './provider';
export {
  CollabEditProvider,
};

export const pluginKey = new PluginKey('collabEditPlugin');

export const createPlugin = (dispatch: Dispatch, providerFactory: ProviderFactory) => {

  let collabEditProvider: CollabEditProvider | null;
  let isReady = false;

  return new Plugin({
    key: pluginKey,
    state: {
      init: PluginState.init,
      apply(tr, prevPluginState: PluginState, oldState, newState) {
        const pluginState = prevPluginState.apply(tr);

        if (tr.getMeta('isLocal')) {
          if (collabEditProvider) {
            collabEditProvider.send(tr, oldState, newState);
          }
        }

        const { participants, sessionId } = pluginState;

        if (collabEditProvider) {
          const selection = getSendableSelection(oldState, newState);
          if (selection && sessionId) {
            (collabEditProvider as any).sendMessage({
              type: 'telepointer',
              selection,
              sessionId,
            });
          }
        }

        dispatch(pluginKey, { participants, sessionId });

        return pluginState;
      },
    },
    props: {
      decorations(state) {
        return this.getState(state).decorations;
      }
    },
    filterTransaction(tr, state) {
      // Don't allow transactions that modifies the document before
      // collab-plugin is ready.
      if (!isReady && tr.docChanged) {
        return false;
      }

      return true;
    },
    view(view) {
      providerFactory.subscribe('collabEditProvider', async (name: string, providerPromise?: Promise<CollabEditProvider>) => {
        if (providerPromise) {
          collabEditProvider = await providerPromise;

          // Initialize provider
          collabEditProvider
            .on('init', data => { isReady = true; handleInit(data, view); })
            .on('connected', data => handleConnection(data, view))
            .on('data', data => applyRemoteData(data, view))
            .on('presence', data => handlePresence(data, view))
            .on('telepointer', data => handleTelePointer(data, view))
            .on('error', err => {
              // TODO: Handle errors propery (ED-2580)
            })
            .initialize(() => view.state)
            ;
        } else {
          collabEditProvider = null;
          isReady = false;
        }
      });

      return {
        destroy() {
          providerFactory.unsubscribeAll('collabEditProvider');
          collabEditProvider = null;
        }
      };

    }
  });
};

interface Participant {
  lastActive: number;
  sessionId: string;
  avatar: string;
}

class Participants {

  constructor(private participants: Map<string, Participant> = new Map<string, Participant>()) {
  }

  add(data: Participant[]) {
    const newSet = new Map<string, Participant>(this.participants);
    data.forEach(participant => {
      newSet.set(participant.sessionId, participant);
    });
    return new Participants(newSet);
  }

  remove(sessionIds: string[]) {
    const newSet = new Map<string, Participant>(this.participants);
    sessionIds.forEach(sessionId => {
      newSet.delete(sessionId);
    });

    return new Participants(newSet);
  }

  update(sessionId: string, lastActive: number) {
    const newSet = new Map<string, Participant>(this.participants);
    const data = newSet.get(sessionId);
    if (!data) {
      return this;
    }

    newSet.set(sessionId, {
      ...data,
      lastActive
    });

    return new Participants(newSet);
  }

  toArray() {
    return Array.from(this.participants.values());
  }

}

const createTelepointer = (from: number, to: number, sessionId: string, isSelection: boolean) => {
  // TODO: Use Decoration.widget when there's no selection. (ED-2728)

  const color = getAvatarColor(sessionId).index.toString();
  return Decoration.inline(from, to, { class: `telepointer color-${color} ${isSelection ? 'telepointer-selection' : 'telepointer-pointer'}` }, { pointer: { sessionId } });
};

class PluginState {

  private d: DecorationSet;
  private p: Participants;
  private sid?: string;

  get decorations() {
    return this.d;
  }

  get participants() {
    return this.p.toArray();
  }

  get sessionId() {
    return this.sid;
  }

  constructor(decorations: DecorationSet, participants: Participants, sessionId?: string) {
    this.d = decorations;
    this.p = participants;
    this.sid = sessionId;
  }

  apply(tr: Transaction) {
    let { d, p, sid } = this;

    const presenceData = tr.getMeta('presence');
    const telepointerData = tr.getMeta('telepointer');
    const sessionIdData = tr.getMeta('sessionId');

    if (sessionIdData) {
      sid = sessionIdData.sid;
    }

    let add: any[] = [];
    let remove: any[] = [];

    if (presenceData) {
      const { joined = [], left = [] as { sessionId: string }[] } = presenceData;

      p = p.remove(left.map(i => i.sessionId));
      p = p.add(joined);

      // Remove telepointers for users that left
      left.forEach(i => {
        const pointer = findPointer(i.sessionId, d);
        if (pointer) {
          remove.push(pointer);
        }
      });
    }

    if (telepointerData) {
      const { sessionId } = telepointerData;
      if (sessionId && sessionId !== sid) {
        const oldPointer = findPointer(telepointerData.sessionId, d);
        if (oldPointer) {
          remove.push(oldPointer);
        }

        const { anchor, head } = telepointerData.selection;
        const from = anchor < head ? anchor : head;
        const to = anchor >= head ? anchor : head;

        const isSelection = to - from > 0;
        add.push(createTelepointer(from - (isSelection ? 0 : 1), to, sessionId, isSelection));
      }
    }

    if (remove.length) {
      d = d.remove(remove);
    }

    if (add.length) {
      d = d.add(tr.doc, add);
    }

    return new PluginState(d, p, sid);
  }

  static init(config: any) {
    const { doc } = config;

    return new PluginState(DecorationSet.create(doc, []), new Participants());
  }
}
