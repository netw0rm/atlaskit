import { AbstractMentionResource } from 'ak-mention';
import { Promise } from 'es6-promise';

export interface MentionSource {
  query(query: string): void;
  on(eventName: string, handler: (response: { query: string, results: Array<{ attributes: { username: string, display_name: string, avatar_url: string, is_teammate?: boolean } }>}) => void);
}

class MentionResource extends AbstractMentionResource {
  private config: any;
  private lastReturnedSearch: any;
  private fetchCount = 0;
  private mentionSource: MentionSource;

  constructor(config: any, mentionSource: MentionSource) {
    super();

    this.config = config;
    this.lastReturnedSearch = 0;
    this.mentionSource = mentionSource;
  }

  filter(query: string) {
    const searchTime = Date.now();
    const notify = (mentions: any) => {
        this.lastReturnedSearch = searchTime;
        this._notifyListeners(mentions);
    };

    const notifyErrors = (error: any) => {
      this._notifyErrorListeners(error);
    };

    this.search(query)
      .then(mentions => notify({mentions}))
      .catch(err => notifyErrors(err));
  }

  search(query: string): Promise<any> {
    this.fetchCount++;
    return new Promise((resolve, reject) => {

      if (this.mentionSource) {
        this.mentionSource.on('respond', (response) => {
          if (response.query !== query) {
            reject();
            return;
          }

          let mentions = response.results.map((item, index) => {
            return {
              'id': item.attributes.username,
              'name': item.attributes.display_name,
              'mentionName': item.attributes.username,
              'avatarUrl': item.attributes.avatar_url,
              'lozenge': item.attributes.is_teammate ? 'teammate' : null
            };
          });

          resolve(mentions);
        });

        this.mentionSource.query(query);
      } else {
        reject(new Error('No mentions source provided'));
      }
    });
  }

  // eslint-disable-next-line class-methods-use-this
  recordMentionSelection(mention: any) {
  }
}

export { MentionResource };
