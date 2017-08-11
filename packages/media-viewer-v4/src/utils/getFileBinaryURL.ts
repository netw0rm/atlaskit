import {Context, FileDetails} from '@atlaskit/media-core';
import getFileURL from './getFileURL';

export default async function(details: FileDetails, context: Context, collectionName?: string): Promise<string> {
  const url = `/file/${details.id}/binary`;
  return getFileURL(url, context, collectionName);
}
