import { Search } from 'js-search';
import mentionData from './_mention-data';

const search = new Search('id');
search.addIndex(['attributes', 'display_name']);
search.addIndex(['attributes', 'username']);
search.addDocuments(mentionData.results);

export class MockMentionSource {
  handlers = {};

  query(query: string) {
    const response = { query, results: search.search(query) } ;
    if (this.handlers['respond']) {
      this.handlers['respond'](response);
    }
  }

  on(eventName: string, handler: Function) {
    this.handlers[eventName] = handler;
  }
}
