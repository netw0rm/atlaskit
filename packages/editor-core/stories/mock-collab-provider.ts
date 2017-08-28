import { AbstractCollabEditProvider } from '../src/editor/plugins/collab-edit/provider';

class MockCollabEditProvider extends AbstractCollabEditProvider {
  initialize(getState: () => any) {
    this.getState = getState;

    this.eventBus.emit('init', {
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

    return this;
  }

  send(tr, oldState, newState) {
    if (tr.steps && tr.steps.length) {
      const json = tr.steps.map(step => step.toJSON());
      this.eventBus.emit('data', { json });
    }
  }
}

export const collabEditProvider = new MockCollabEditProvider();
export const collabEditProviderPromise = Promise.resolve(collabEditProvider);
