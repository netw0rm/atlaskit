import createRequest from './util/createRequest';
import {UrlPreview, MediaApiConfig} from '../';

export interface UrlPreviewService {
  getUrlPreview(url: string, clientId: string): Promise<UrlPreview>;
}

export class MediaUrlPreviewService implements UrlPreviewService {

  constructor(private readonly config: MediaApiConfig) {}

  getUrlPreview(url: string, clientId: string): Promise<UrlPreview> {

    const request = createRequest({
      config: this.config,
      clientId: clientId
    });

    return request({
      url: '/link/preview',
      params: {url}
    })
      .then(json => json.data.preview as UrlPreview);
    ;

  }
}
