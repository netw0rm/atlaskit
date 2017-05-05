import axios, { CancelToken } from 'axios';
import axiosRetry from 'axios-retry';
import 'es6-promise/auto'; // 'axios' needs a Promise polyfill

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

const serviceName = 'pf-ppl-directory-service';
const graphqlEndpoint = '/graphql';

const getServiceUrlFromLocation = () => {
  const hostname = window.location.hostname;

  // Local dev
  if (hostname === 'local.atlassian.io' || hostname === 'localhost' || window.location.port === '3001') {
    return `https://${serviceName}.internal.uswest2.staging.atlassian.io`;
  }

  if (
    (/atlassian.net$/).test(hostname) ||
    (/jira.com$/).test(hostname)
  ) {
    return `https://${serviceName}.atlassian.io`;
  }

  if ((/staging.atlassian.io$/).test(hostname)) {
    return `https://${serviceName}.internal.useast.staging.atlassian.io`;
  }

  if ((/domain.dev.atlassian.io$/).test(hostname)) {
    return `https://${serviceName}.internal.useast.staging.atlassian.io`;
  }

  if ((/atlassian.io$/).test(hostname)) {
    return `https://${serviceName}.atlassian.io`;
  }

  return '';
};

export default class BaseGraphQlClient {
  constructor(inAxios) {
    this.axiosInstance = inAxios || axios.create();
    axiosRetry(this.axiosInstance, {
      retries: 1,
      retryCondition: err => !axios.isCancel(err),
    });
    this.serviceUrl = `${getServiceUrlFromLocation()}${graphqlEndpoint}`;
    this._cancel = () => {};
  }

  cancelPreviousRequest() {
    this._cancel('cancel');
  }

  makeGraphQLRequest(body) {
    const request = this.axiosInstance.post(
      this.serviceUrl,
      JSON.parse(body),
      {
        responseType: 'json',
        withCredentials: true,
        headers: {
          // 'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        cancelToken: new CancelToken((c) => {
          this._cancel = c;
        }),
        validateStatus: status => (
          status < 300 || status === 400
        ),
      }
    );

    return request
      .then((response) => {
        if (response.data.errors) {
          const errorData = createGraphQLErrorData(response.data.errors);
          throw new GraphQLError(errorData);
        }

        return response.data.data && response.data.data.Search;
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          throw error;
        }

        if (error instanceof GraphQLError) {
          throw error;
        }

        if (error.response) {
          throw new HttpError({
            message: error.response.statusText,
            status: error.response.status,
          });
        }

        throw new DefaultError({
          message: error.message,
        });
      });
  }
}
