import axios, { CancelToken } from 'axios';

export class /* interface */ ISearchProvider {
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

  query = () => {};
}

// Babel does not support extending built-in types
// http://stackoverflow.com/questions/31089801/extending-error-in-javascript-with-es6-syntax

export class DefaultError {
  constructor({ message }) {
    this.message = message || 'UnkownError';
    this.stack = new Error().stack;
  }
}

DefaultError.prototype = Object.create(Error.prototype);

export class HttpError {
  constructor({ message, status }) {
    this.message = message;
    this.status = status;
    this.stack = new Error().stack;
  }
}

HttpError.prototype = Object.create(Error.prototype);

export class GraphQLError {
  constructor({ message, fields }) {
    this.message = message;
    if (fields) {
      this.fields = fields;
    }
    this.stack = new Error().stack;
  }
}

GraphQLError.prototype = Object.create(Error.prototype);

const createGraphQLErrorData = (error) => {
  const firstError = error[0];

  const errorData = {
    message: firstError.message,
  };

  if (firstError.fields) {
    errorData.fields = firstError.fields.reduce((obj, item) => {
      obj[item.field] = item.message;
      return obj;
    }, {});
  }

  return errorData;
};

export default class SearchProvider extends /* implements */ ISearchProvider {

  constructor(config) {
    super();

    if (!config.serviceHost) {
      throw new Error('config.serviceHost is a required parameter');
    }

    if (!config.cloudId) {
      throw new Error('config.cloudId is a required parameter');
    }

    this.serviceHost = config.serviceHost;
    this.cloudId = config.cloudId;
    // this.serviceHost = 'https://pf-ppl-directory-service.internal.uswest2.staging.atlassian.io/';
    // this.cloudId = 'DUMMY-a5a01d21-1cc3-4f29-9565-f2bb8cd969f5';
  }

  buildSearchString = (query) => {
    const graphQl = `{
      Search(userId: "655363:7c218e11-d210-43fd-9830-bcc1874e4736", cloudId: "${this.cloudId}", query: "${query}") {
        id
        type
        title
        meta {
          key
          value
        }
      }
    }`;

    return JSON.stringify({
      query: graphQl,
    });
  };

  query = (searchTerm) => {
    const body = this.buildSearchString(searchTerm);

    axios.post(
      `${this.serviceHost}/graphql`,
      JSON.parse(body),
      {
        responseType: 'json',
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
        cancelToken: new CancelToken((c) => {
          this._cancel = c;
        }),
        validateStatus: status => (
          status < 300 || status === 400
        ),
      }
    ).then((response) => {
      if (!response.data || response.data.errors) {
        const errorData = createGraphQLErrorData(response.data.errors);
        throw new GraphQLError(errorData);
      }
      this.notifyChange(response.data.data.Search);
    }).catch((error) => {
      if (!axios.isCancel(error)) {
        if (!error.response) {
          if (error instanceof GraphQLError) {
            throw error;
          }

          throw new DefaultError({
            message: error.message,
          });
        }

        throw new HttpError({
          message: error.response.statusText,
          status: error.response.status,
        });
      }
    });
  }

  notifyChange = (items) => {
    Object.keys(this.changeListeners).forEach(key => this.changeListeners[key](items));
  }

  notifyError(items) {
    Object.keys(this.errorListeners).forEach(key => this.errorListeners[key](items));
  }

}
