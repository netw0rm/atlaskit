import axios from 'axios';
import {LinkItem, MediaApiConfig, UrlPreview} from '../';

export interface LinkService {
  getLinkItem(linkId: string, clientId: string, collection?: string): Promise<LinkItem>;
  addLinkItem(url: string, clientId: string, collection: string, metadata?: UrlPreview): Promise<string>;
}

export class MediaLinkService implements LinkService {
  constructor(private readonly config: MediaApiConfig) {
  }

  getLinkItem(linkId: string, clientId: string, collectionName: string): Promise<LinkItem> {
    return this.config.tokenProvider(collectionName)
      .then(token => {
        const params = {collection: collectionName};

        return axios.get(`/link/${linkId}`, {
          baseURL: this.config.serviceHost,
          headers: {
            'X-Client-Id': clientId,
            'Authorization': `Bearer ${token}`
          },
          params
        }).then(response => response.data.data)
          .then(data => {
            return <LinkItem> {
              type: 'link',
              details: {
                id: data.id,
                url: data.url,
                type: data.metadata.type,
                title: data.metadata.title,
                description: data.metadata.description,
                site: data.metadata.site,
                author: data.metadata.author,
                date: data.metadata.date,

                resources: data.metadata.resources
              }
            };
          });
      });
  }

  addLinkItem(url: string, clientId: string, collectionName: string, metadata?: UrlPreview): Promise<string> {
    return this.config.tokenProvider(collectionName)
      .then(token => {
        const data = {url, metadata};
        const params = {collection: collectionName};

        return axios.post('/link', data, {
          baseURL: this.config.serviceHost,
          headers: {
            'X-Client-Id': clientId,
            'Authorization': `Bearer ${token}`
          },
          params
        });
      })
      .then(response => response.data.data.id);
  }
}
