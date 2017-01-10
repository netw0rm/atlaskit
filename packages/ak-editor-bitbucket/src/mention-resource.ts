import { AbstractMentionResource } from 'ak-mention';
import { Promise } from 'es6-promise';

class MentionResource extends AbstractMentionResource {
  _config: any;
  _lastReturnedSearch: any;
  _fetchCount = 0;
  _mentionSource: any;

  constructor(config: any, mentionSource: any) {
    super();

    this._config = config;
    this._lastReturnedSearch = 0;
    this._mentionSource = mentionSource;
  }

  filter(query: string) {
    const searchTime = Date.now();
    const notify = (mentions: any) => {
        this._lastReturnedSearch = searchTime;
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
    this._fetchCount++;
    return new Promise((resolve, reject) => {

      if (this._mentionSource) {
        this._mentionSource.on('respond', (response: any) => {
          if (response.query !== query) {
            reject();
            return;
          }

          let mentions = response.results.map((item: any, index: number) => {
            return {
              'id': index.toString(),
              'name': item.attributes.display_name,
              'mentionName': item.attributes.username,
              'avatarUrl': item.attributes.avatar_url,
              'lozenge': item.attributes.is_teammate ? 'teammate' : null
            };
          });

          resolve(mentions);
        });

        this._mentionSource.query(query);
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
