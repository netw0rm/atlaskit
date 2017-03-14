import axios from 'axios';
import {UrlPreview, MediaApiConfig} from '../';

export interface UrlPreviewService {
  getUrlPreview(url: string, clientId: string): Promise<UrlPreview>;
}

export class MediaUrlPreviewService implements UrlPreviewService {

  constructor(private readonly config: MediaApiConfig) {}

  getUrlPreview(url: string, clientId: string): Promise<UrlPreview> {
    return this.config.tokenProvider()
      .then(token => {
        const params = {url};
        return axios.get(`/link/preview`, {
          baseURL: this.config.serviceHost,
          headers: {
            'X-Client-Id': clientId,
            'Authorization': `Bearer ${token}`
          },
          params
        }).then(response => response.data.data.preview as UrlPreview);
      });
  }
}
