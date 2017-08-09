import {
  MediaProvider,
  Schema,
} from '@atlaskit/editor-core';

export interface ContextInfo {
  clientId: string;
  serviceHost: string;
  token: string;
  collection: string;
}

export interface MediaContextInfo {
  viewContext?: ContextInfo;
  uploadContext?: ContextInfo;
}

export function isSchemaWithMentions(schema: Schema<any, any>): boolean {
  return !!schema.nodes.mention;
}

export function isSchemaWithLinks(schema: Schema<any, any>): boolean {
  return !!schema.marks.link;
}

export function isSchemaWithCodeBlock(schema: Schema<any, any>): boolean {
  return !!schema.nodes.codeBlock;
}

export function isSchemaWithMedia(schema: Schema<any, any>): boolean {
  return !!schema.nodes.mediaGroup && !!schema.nodes.media;
}

export function isSchemaWithTextColor(schema: Schema<any, any>): boolean {
  return !!schema.marks.textColor;
}

export async function getMediaContextInfo(mediaProvider?: Promise<MediaProvider>): Promise<MediaContextInfo> {
  let mediaContextInfo: MediaContextInfo = {};

  if (mediaProvider) {
    const resolvedMediaProvider = await mediaProvider;

    if (resolvedMediaProvider.viewContext) {
      const viewContext: any = await resolvedMediaProvider.viewContext;

      if (viewContext) {
        const collection = '';
        const { clientId, serviceHost, tokenProvider } = viewContext.config || viewContext;
        const token = await tokenProvider();

        mediaContextInfo.viewContext = { clientId, serviceHost, token, collection };
      }
    }

    if (resolvedMediaProvider.uploadParams && resolvedMediaProvider.uploadParams.collection) {
      const uploadContext = await resolvedMediaProvider.uploadContext;

      if (uploadContext) {
        const { clientId, serviceHost } = uploadContext;
        const { collection } = resolvedMediaProvider.uploadParams;
        const token = await uploadContext.tokenProvider(collection);

        mediaContextInfo.uploadContext = { clientId, serviceHost, token, collection };
      }
    }
  }

  return mediaContextInfo;
}

export function isSchemaWithTables(schema: Schema<any, any>): boolean {
  return (
    !!schema.nodes.table &&
    !!schema.nodes.tableCell &&
    !!schema.nodes.tableHeader &&
    !!schema.nodes.tableRow
  );
}
