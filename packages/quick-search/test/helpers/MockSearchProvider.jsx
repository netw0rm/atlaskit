import { ISearchProvider } from '../../src/api/SearchProvider';
import mockSearchData from './mock-search-data.json';
// import mockSearchData from './mock-hc-search-data.json';

export default class MockSearchProvider extends ISearchProvider {

  query = (searchTerm) => {
    if (!searchTerm) {
      this.notifyChange([]);
      return;
    }

    Promise.resolve(
      mockSearchData.filter(
        ({ title }) => title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
      )
    ).then(items => this.notifyChange(items));
    // ).then(items => this.notifyChange(format(items)));
  }

  notifyChange = (items) => {
    Object.keys(this.changeListeners).forEach(key => this.changeListeners[key](items));
  }

  notifyError(items) {
    Object.keys(this.errorListeners).forEach(key => this.errorListeners[key](items));
  }
}
