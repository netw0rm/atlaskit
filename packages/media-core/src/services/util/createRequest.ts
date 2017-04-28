import axios from 'axios';
import {MediaApiConfig} from '../../config';
import {checkWebpSupport} from '../../utils';

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

export default (requesterOptions: RequesterOptions) => (requestOptions: RequestOptions) : any => {
  return requesterOptions.config.tokenProvider(requesterOptions.collectionName).then(token => {
    return checkWebpSupport().then(isWebpSupported => {
      const headers = {
        ...requestOptions.headers,
        'X-Client-Id': requesterOptions.clientId,
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      } as any;
      const accept = isWebpSupported ? 'image/webp,image/*,*/*;q=0.8' : null;

      // Having an undefined value for the 'accept' property will add {accept: 'undefined'} to the headers
      // which will cause the request to always fail, thats why we need to be more explicit
      if (accept) { headers.accept = accept; }

      return axios({
        method: requestOptions.method || 'get',
        url: requestOptions.url,
        baseURL: requesterOptions.config.serviceHost,
        headers,
        params: {
          collection: requesterOptions.collectionName,
          ...requestOptions.params
        },
        data: requestOptions.data,
        responseType: requestOptions.responseType
      }).then(response => response.data);
    });
  });
};
