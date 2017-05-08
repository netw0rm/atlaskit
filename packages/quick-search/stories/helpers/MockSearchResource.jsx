import sampleResultData from './sample-result-data';
import { AbstractResource } from '../../src/api/SearchResource';

export default class MockSearchResource extends AbstractResource {

  constructor(requestDelay = 0) {
    super();
    this.requestDelay = requestDelay;
  }

  search = (query) => {
    this.cancelQuery();
    const q = query.toLowerCase();
    const results = sampleResultData.Conversations.filter(
      item =>
        item.title.toLowerCase().indexOf(q) !== -1 ||
        item.meta.mentionName.toLowerCase().indexOf(q) !== -1
      );
    const resultGroups = results.length > 0 ? { Conversations: results } : {};
    this.timeoutId = setTimeout(() => {
      this.notifyChange('search', resultGroups);
    }, this.requestDelay);
  }

  recentItems = () => {
    this.cancelQuery();
    setImmediate(() => {
      this.notifyChange('recent', sampleResultData);
    });
  }

  cancelQuery = () => { clearTimeout(this.timeoutId); }

  notifyChange = (type, items) => {
    Object.keys(this.changeListeners).forEach(key => this.changeListeners[key](type, items));
  }

  notifyError = () => {}
}
