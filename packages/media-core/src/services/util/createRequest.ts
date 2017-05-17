import axios from 'axios';
import {MediaApiConfig} from '../../config';
import {checkWebpSupport} from '../../utils';

export type ResponseType = 'json' | 'image';
export interface CreateRequestFunc {
  (requestOptions: RequestOptions): Promise<any>;
}

export interface RequesterOptions {
  clientId: string;
  collectionName?: string;
  config: MediaApiConfig;
}

export interface RequestOptions {
  method?: string;
  url: string;
  params?: Object;
  headers?: Object;
  data?: Object;
  responseType?: ResponseType;
}

const buildHeaders = (requesterOptions: RequesterOptions, requestOptions: RequestOptions, token: string) => {
  const headers = {
    ...requestOptions.headers,
    'X-Client-Id': requesterOptions.clientId,
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  } as any;

  if (requestOptions.responseType === 'image') {
    return checkWebpSupport().then(isWebpSupported => {
      // q=0.8 stands for 'quality factor' => http://stackoverflow.com/a/10496722
      const noWebpAcceptHeader = 'image/*,*/*;q=0.8';
      const webpAcceptHeader = 'image/webp,image/*,*/*;q=0.8';

      headers.accept = isWebpSupported ? webpAcceptHeader : noWebpAcceptHeader;
      return headers;
    });
  }

  return Promise.resolve(headers);
};

const responseTypeToAxios = (responseType?: ResponseType): string => {
  responseType = responseType || 'json';

  const responseTypeMap = {
    image: 'blob',
    json: 'json'
  };

  return responseTypeMap[responseType];
};

export default (requesterOptions: RequesterOptions) => (requestOptions: RequestOptions) : any => {
  return requesterOptions.config.tokenProvider(requesterOptions.collectionName).then(token => {
    return buildHeaders(requesterOptions, requestOptions, token).then(headers => {
      const responseType = responseTypeToAxios(requestOptions.responseType);
      const {method, url, params, data} = requestOptions;
      const {config, collectionName} = requesterOptions;

      return axios({
        method: method || 'get',
        url: url,
        baseURL: config.serviceHost,
        headers,
        params: {
          collection: collectionName,
          ...params
        },
        data: data,
        responseType
      }).then(response => response.data);
    });
  });
};
