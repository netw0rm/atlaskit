import * as qs from 'query-string';
import {Context, FileItem} from '@atlaskit/media-core';

export async function getBinaryURL(fileItem: FileItem, context: Context, collectionName?: string): Promise<string> {
  const url = `/file/${fileItem.details.id}/binary`;
  return getAPIURL(url, context, collectionName);
}

export async function getAPIURL(url: string, context: Context, collectionName?: string): Promise<string> {
  const token = await context.config.tokenProvider(collectionName);

  // extract the query string parameters
  const queryStringIndex = url.indexOf('?');
  let urlPath = url;
  let urlParams: any = {};
  if (queryStringIndex !== -1) {
    urlPath = url.substr(0, queryStringIndex);
    urlParams = qs.parse(url.substr(queryStringIndex + 1));
  }

  // update the query string parameters
  urlParams.client = context.config.clientId;
  urlParams.collection = collectionName;
  urlParams.token = token;

  const prefix = context.config.serviceHost;
  return `${prefix}${url}?${qs.stringify(urlParams)}`;
}
