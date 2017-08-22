import { EventEmitter } from 'events';
import { CollabEditProvider } from '../src/editor/plugins/collab-edit';

class MockCollabEditProvider implements CollabEditProvider {

  private getDoc: any;
  private eventBus = new EventEmitter();

  initialize(getDoc: () => any) {
    this.getDoc = getDoc;
    return Promise.resolve({
      'type': 'doc',
      'content': [
        {
          'type': 'paragraph',
          'content': [
            {
              'type': 'text',
              'text': 'Hello World'
            }
          ]
        }
      ]
    });
  }

  send(tr, oldState, newState) {
    if (tr.steps && tr.steps.length) {
      const json = tr.steps.map(step => step.toJSON());
      this.eventBus.emit('data', { json });
    }
  }

  on(evt: 'data' | 'error', handler: (...args) => void) {
    this.eventBus.on(evt, handler);
  }

}

export const collabEditProvider = new MockCollabEditProvider();
export const collabEditProviderPromise = Promise.resolve(collabEditProvider);
