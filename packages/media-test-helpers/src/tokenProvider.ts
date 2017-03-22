import axios from 'axios';
import { defaultCollectionName } from './collectionNames';
import { JwtToken, JwtTokenProvider } from '@atlaskit/media-core';

const tokens = {};
const baseURL = 'https://media-playground.internal.app.dev.atlassian.io';

export class StoryBookTokenProvider {
  static tokenProvider(collectionName: string): Promise<JwtToken> {
    const params = { collection: collectionName || defaultCollectionName };
    const token = tokens[params.collection];

    if (token) { return token; }

    tokens[params.collection] = Promise.resolve(axios.get('/token', {
      baseURL,
      headers: {},
      params
    }).then(response => response.data.token));

    return tokens[params.collection];
  }

  static withAccess(access: { [resourceUrn: string]: string[] }): JwtTokenProvider {
    return (collection?: string) => {
      return new Promise((resolve, reject) => {
        const config = {
          baseURL
        };

        if (collection) {
          config['params'] = { collection };
        }

        axios
          .post('/token', { access }, config)
          .then(response => response.data.token)
          .then(resolve)
          .catch(reject);
      });
    };
  }
}
