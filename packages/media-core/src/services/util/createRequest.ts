import axios from 'axios';
import {MediaApiConfig} from '../../config';

export interface CreateRequestFunc {
  (requestOptions: RequestOptions): Promise<any>;
}

export interface RequesterOptions {
  clientId: string;
  collectionName?: string;
  config: MediaApiConfig;
};

export interface RequestOptions {
  method?: string;
  url: string;
  params?: Object;
  headers?: Object;
  data?: Object;
  responseType?: string;
};

export default (requesterOptions: RequesterOptions) => (requestOptions: RequestOptions) => {
  return requesterOptions.config.tokenProvider(requesterOptions.collectionName).then(token => {
    return axios({
      method: requestOptions.method || 'get',
      url: requestOptions.url,
      baseURL: requesterOptions.config.serviceHost,
      headers: {
        ...requestOptions.headers,
        'X-Client-Id': requesterOptions.clientId,
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      params: {
        collection: requesterOptions.collectionName,
        ...requestOptions.params
      },
      data: requestOptions.data,
      responseType: requestOptions.responseType
    })
      .then(response => response.data)
    ;
  });
};
