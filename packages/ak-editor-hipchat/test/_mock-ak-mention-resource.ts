import { Search } from 'js-search';
import { AbstractMentionResource } from 'ak-mention';
import mentionData from './_mention-data';

const search = new Search('id');
search.addIndex('name');
search.addIndex('mentionName');

search.addDocuments(mentionData.mentions);

class MentionResource extends AbstractMentionResource {

  private _config: { minWait: number, maxWait: number };
  private _lastReturnedSearch: number;

  constructor(config) {
    super();

    this._config = config;
    this._lastReturnedSearch = 0;
  }

  filter(query: string) {
    const searchTime = Date.now();
    const notify = (mentions) => {
      if (searchTime >= this._lastReturnedSearch) {
        this._lastReturnedSearch = searchTime;
        this._notifyListeners(mentions);
      } else {
        const date = new Date(searchTime).toISOString().substr(17, 6);
      }
    };

    const notifyErrors = (error) => {
      this._notifyErrorListeners(error);
    };

    const minWait = this._config.minWait || 0;
    const randomTime = (this._config.maxWait || 0) - minWait;
    const waitTime = (Math.random() * randomTime) + minWait;
    setTimeout(() => {
      let mentions;
      if (query === 'error') {
        notifyErrors('mock-error');
        return;
      } else if (query) {
        mentions = search.search(query);
      } else {
        mentions = mentionData.mentions;
      }
      notify({
        mentions,
      });
    }, waitTime + 1);
  }

  recordMentionSelection(mention: any) {
  }
}

export default MentionResource;
