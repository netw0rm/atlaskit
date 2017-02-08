import axios from 'axios';
import {Config} from '@atlaskit/media-domain';

interface TokenResponse {
  token: string;
}

export class StoryBookTokenProvider {

  static tokenProvider(collectionName: string): Promise<Config.JwtToken> {
    const params = {collection: collectionName};
    return Promise.resolve(axios.get('/token', {
      baseURL: 'https://media-playground.internal.app.dev.atlassian.io',
      headers: {},
      params
    }).then(response => response.data.token));
  }
}
