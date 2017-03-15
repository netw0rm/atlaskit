import axios from 'axios';
import {defaultCollectionName} from './contextProvider';
export type JwtToken = string;

let tokenRequest: Promise<JwtToken>;

export class StoryBookTokenProvider {
  static tokenProvider(collectionName: string): Promise<JwtToken> {
    const params = {collection: collectionName || defaultCollectionName};
    if (tokenRequest) {
      return tokenRequest;
    }
    tokenRequest = Promise.resolve(axios.get('/token', {
      baseURL: 'https://media-playground.internal.app.dev.atlassian.io',
      headers: {},
      params
    }).then(response => response.data.token));
    return tokenRequest;
  }
}
