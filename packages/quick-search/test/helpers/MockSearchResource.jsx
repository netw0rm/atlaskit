import { AbstractResource } from '../../src/api/SearchResource';
import mockSearchData from './mock-search-data.json';
import recentData from './mock-recent-data.json';
// import mockSearchData from './mock-hc-search-data.json';

export default class MockSearchResource extends AbstractResource {

  constructor(delay = 0) {
    super();
    this.delay = delay;
  }

  query = (searchTerm) => {
    if (!searchTerm) {
      this.notifyChange([]);
      return;
    }

    setTimeout(
      () => {
        Promise.resolve(
          mockSearchData.filter(
            ({ title }) => title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
          )
        ).then((data) => {
          const items = data.length ? data : null;
          this.notifyChange(items);
        });
      }
      , this.delay || 0
    );
  }

  // eslint-disable-next-line class-methods-use-this
  recentItems() {
    return Promise.resolve(recentData);
  }

  notifyChange = (items) => {
    Object.keys(this.changeListeners).forEach(key => this.changeListeners[key](items));
  }

  notifyError(items) {
    Object.keys(this.errorListeners).forEach(key => this.errorListeners[key](items));
  }
}
