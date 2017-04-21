import axios from 'axios';
import searchClient from '../common/SearchClient';

/* interface IResource {
  subscribe = (key, changeCallback, errorCallback) => {}
  unsubscribe = (key) => {}
}*/

export class AbstractResource /* implements IResource */ {
  constructor() {
    this.changeListeners = {};
    this.errorListeners = {};
  }

  subscribe = (key, changeCallback, errorCallback) => {
    if (!key) return;
    if (changeCallback) {
      this.changeListeners[key] = changeCallback;
    }
    if (errorCallback) {
      this.errorListeners[key] = errorCallback;
    }
  }

  unsubscribe(key) {
    if (!key) return;

    delete this.changeListeners[key];
    delete this.errorListeners[key];
  }
}

export class SearchSubscriber {
  constructor(options) {
    if (!options.subscriberKey && !options.key) {
      throw new Error('Missing required parameter: subscriberKey');
    }
    this.key = options.subscriberKey || options.key;
    this.defaultChangeHandler = options.changeHandler;
    this.defaultErrorHandler = options.errorHandler;
  }

  subscribe = (searchResource, changeHandler, errorHandler) => {
    if (!searchResource) {
      throw new Error('Passed in SearchResource must not be null');
    }
    searchResource.subscribe(
      this.key,
      changeHandler || this.defaultChangeHandler,
      errorHandler || this.defaultErrorHandler
    );
  }

  unsubscribe(searchResource) {
    if (searchResource) {
      searchResource.unsubscribe(this.key);
    }
  }
}

export default class SearchResource extends AbstractResource {

  constructor(config) {
    super(config);

    if (!config.cloudId) {
      throw new Error('config.cloudId is a required parameter');
    }

    if (!config.userId) {
      throw new Error('config.userId is a required parameter');
    }

    this.cloudId = config.cloudId;
    this.userId = config.userId;
    // this.cloudId = 'DUMMY-a5a01d21-1cc3-4f29-9565-f2bb8cd969f5';
    this.searchClient = searchClient;

    this.queryClient = this.queryClient.bind(this);
  }

  queryClient(searchTerm) {
    return this.searchClient.query(searchTerm, this.userId, this.cloudId);
  }

  query = (searchTerm) => {
    this.queryClient(searchTerm)
      .then(items => this.notifyChange('search', items))
      .catch(this.notifyError);
  }

  /** TODO:revise when more info/design is available */
  recentItems = () => {
    this.cancelQuery();
    if (this._recentItems) {
      this.notifyChange('recent', this._recentItems);
      return;
    }
    this.queryClient('')
      .then((items) => {
        this._recentItems = items;
        this.notifyChange('recent', items);
      })
      .catch(this.notifyError);
  }

  cancelQuery = () => this.searchClient.cancelPreviousRequest();

  notifyChange = (type, items) => {
    Object.keys(this.changeListeners).forEach(key => this.changeListeners[key](type, items));
  }

  notifyError = (error) => {
    if (!axios.isCancel(error)) {
      Object.keys(this.errorListeners).forEach(key => this.errorListeners[key](error));
    }
  }
}

/**
 * Core idea: Be the single point of modification when search API inevitably
 * changes
 */
export class ParsingSearchResource extends SearchResource {

  constructor(...args) {
    super(...args);
    this.queryClient = this.queryClient.bind(this);
  }

  queryClient(searchTerm) {
    return super.queryClient(searchTerm).then(this.parse);
  }

  parse = (jsonArray) => {
    if (!jsonArray || !jsonArray.length) {
      return [];
    }
    return jsonArray.map(item => (
      item.meta && item.meta.length
        ? { ...item, meta: this.formatMetaData(item.meta) }
        : item
    ));
  }

  // eslint-disable-next-line class-methods-use-this
  formatMetaData(metaData) {
    return metaData.reduce(
      (obj, { key, value }) => ({ ...obj, [key]: value })
    , {});
  }
}
