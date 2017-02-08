import { Search } from 'js-search';

import debug from '../src/util/logger';
import { AbstractMentionResource } from '../src/api/MentionResource';
import mentionData from './_mention-data';

const search = new Search('id');
search.addIndex('name');
search.addIndex('mentionName');

search.addDocuments(mentionData.mentions);

class MentionResourceWithInfoHints extends AbstractMentionResource {

  constructor(config) {
    super();

    this._config = config;
    this._lastReturnedSearch = 0;
  }

  filter(query) {
    debug('_mock-ak-mention-resource filter', query);
    const searchTime = Date.now();
    const notify = (mentions) => {
      if (searchTime >= this._lastReturnedSearch) {
        this._lastReturnedSearch = searchTime;
        this._notifyListeners(mentions);
      } else {
        const date = new Date(searchTime).toISOString().substr(17, 6);
        debug('Stale search result, skipping', date, query); // eslint-disable-line no-console, max-len
      }
    };
    const notifyInfo = (info) => {
      this._notifyInfoListeners(info);
    };

    const notifyErrors = (error) => {
      this._notifyErrorListeners(error);
    };

    const minWait = this._config.minWait || 0;
    const randomTime = (this._config.maxWait || 0) - minWait;
    const waitTime = (Math.random() * randomTime) + minWait;
    setTimeout(() => {
      let mentions = [];
      if (query === 'error') {
        notifyErrors('mock-error');
        return;
      } else if (query && query.length >= 3) {
        debug('_doing search', query);
        mentions = search.search(query);
        debug('_results', mentions.length);

        if (!mentions.length) {
          notifyInfo(`Found no matches for ${query}`);
        }
      } else {
        notifyInfo('Continue typing to search for a user');
      }
      notify({
        mentions,
      });
    }, waitTime + 1);
  }

  // eslint-disable-next-line class-methods-use-this
  recordMentionSelection(mention) {
    debug(`Record mention selection ${mention.id}`);
  }
}

export default MentionResourceWithInfoHints;
