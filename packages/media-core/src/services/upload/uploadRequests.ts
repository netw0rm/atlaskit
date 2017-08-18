import { MediaApiConfig, FileDetails } from '../..';
import { Chunk } from './chunk';
import createRequest, { CreateRequestFunc, RequestOptions } from '../util/createRequest';
import { retryTask } from '../util/retryTask';

export interface ChunkProbeResult {
  readonly chunk: Chunk;
  readonly exists: boolean;
}

type ETagResults = { [etag: string]: { exists: boolean } };

interface ProbeChunksResponse {
  data: {
    results: ETagResults
  };
}

interface CreateUploadResponse {
  data: Array<{ id: string }>;
}

interface FileInfoResponse {
  data: FileDetails;
}

export class UploadRequests {
  private readonly request: CreateRequestFunc;

  constructor(config: MediaApiConfig, clientId: string) {
    this.request = createRequest({
      config, clientId, preventPreflight: true
    });
  }

  // Probes no more than 100 chunks
  probeChunks(chunks: Array<Chunk>): Promise<Array<ChunkProbeResult>> {
    return this.sendRequest<ProbeChunksResponse>({
      method: 'POST',
      url: '/chunk/probe',
      data: {
        chunks: chunks.map(c => c.etag)
      }
    })
      .then((response: ProbeChunksResponse) => {
        const results: ETagResults = response && response.data && response.data.results
          ? response.data.results
          : {};

        return chunks.map((chunk) => {
          const probeResult: ChunkProbeResult = {
            chunk,
            exists: results[chunk.etag] && results[chunk.etag].exists
          };

          return probeResult;
        });
      });
  }

  // Uploads one chunk to Media API
  uploadChunk(chunk: Chunk): Promise<void> {
    return this.sendRequest<void>({
      method: 'PUT',
      url: `/chunk/${chunk.etag}`,
      data: chunk.blob
    });
  }

  // Creates an upload session, to which we will add uploaded chunks
  createUpload(): Promise<string> {
    // Media API may not be able to create the required upload container. If it fails, this function retries
    const numRetries = 5;
    const delay = 1000;
    const delayMultiplier = 2;

    return retryTask(() => this.createUploadOnce(), numRetries, delay, delayMultiplier);
  }

  createUploadOnce(): Promise<string> {
    return this.sendRequest<CreateUploadResponse>({
      method: 'POST',
      url: '/upload',
      params: { createUpTo: 1 }
    })
      .then((response: CreateUploadResponse) => {
        if (!response || !response.data || response.data.length === 0) {
          throw new Error('Could not create upload container');
        }

        return response.data[0].id;
      });
  }

  // Appends the chunks to the upload session
  appendChunksToUpload(uploadId: string, chunks: Array<Chunk>): Promise<string> {
    return this.sendRequest({
      method: 'PUT',
      url: `/upload/${uploadId}/chunks`,
      data: {
        chunks: chunks.map(c => c.etag),
        offset: 0
      }
    })
    .then(() => uploadId);
  }

  // Creates a file from the upload session
  createFileFromUpload(uploadId: string, fileName: string, fileType: string, collectionName?: string): Promise<string> {
    return this.sendRequest({
      method: 'POST',
      url: '/file/upload',
      params: {
        collection: collectionName
      },
      data: {
        uploadId,
        mimeType: fileType,
        name: fileName,
      }
    });
  }

  // Polls the file for metadata. Retries several times if processing is not finished.
  pollForFileMetadata(fileId: string, collectionName?: string): Promise<FileDetails> {
    const numRetries = 10;
    const delay = 1000;
    const delayMultiplier = 2;

    return retryTask(
      () => this.getFileMetadata(fileId, collectionName),
      numRetries, delay, delayMultiplier
    );
  }

  getFileMetadata(fileId: string, collectionName?: string): Promise<FileDetails> {
    const request = {
      method: 'GET',
      url: `file/${fileId}`,
      parameters: collectionName ? { collection: collectionName } : {}
    };

    return this.sendRequest<FileInfoResponse>(request)
      .then((response) => {
        const { data } = response;

        if (data.processingStatus === 'succeeded' || data.processingStatus === 'failed') {
          return data;
        }

        throw new Error('Processing not finished');
      });
  }

  private sendRequest<T>(request: RequestOptions): Promise<T> {
    return this.request(request);
  }
}
