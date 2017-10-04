import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';
import { defaultCollectionName } from './collectionNames';
import { Auth, AuthProvider, AuthContext } from '@atlaskit/media-core';

const cachedAuths: { [key: string]: Auth } = {};
const authProviderBaseURL = 'https://media-playground.internal.app.dev.atlassian.io';
const userAuthProviderBaseURL = 'https://dt-api.internal.app.dev.atlassian.io';

export class StoryBookAuthProvider {
  static create(isAsapEnvironment: boolean, access?: { [resourceUrn: string]: string[] }): AuthProvider {
    return (authContext?: AuthContext): Promise<Auth> => {
      const collectionName = authContext && authContext.collectionName || defaultCollectionName;
      const accessStr = access ? JSON.stringify(access) : '';
      const cacheKey = `${collectionName}-${accessStr}-${isAsapEnvironment}`;

      if (cachedAuths[cacheKey]) {
        return Promise.resolve(cachedAuths[cacheKey]);
      }

      const config: AxiosRequestConfig = {
        baseURL: authProviderBaseURL,
        headers: {},
        params: {
          collection: collectionName,
          environment: isAsapEnvironment ? 'asap' : ''
        }
      };

      let whenGotResponse: AxiosPromise;
      if (access) {
        whenGotResponse = axios.post('/token', { access }, config);
      } else {
        whenGotResponse = axios.get('/token', config);
      }

      return whenGotResponse.then(response => {
        const auth = response.data as Auth;
        cachedAuths[cacheKey] = auth;
        return auth;
      });
    };
  }
}

export class StoryBookUserAuthProvider {
  static create(apiURL: string = userAuthProviderBaseURL) {
    return (authContext?: AuthContext): Promise<Auth> => {
      const config: AxiosRequestConfig = {
        baseURL: apiURL,
        headers: {},
        withCredentials: true,
      };
      const cacheKey = apiURL;

      const whenGotResponse = axios.get('/picker/auth/cookie', config);

      return whenGotResponse.then(response => {
        const client = response.data.data.client;
        const auth = {
          clientId: client.id,
          token: client.token,
        };
        cachedAuths[cacheKey] = auth;
        return auth;
      });
    };
  }
}
