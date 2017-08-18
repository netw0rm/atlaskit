import { Observable } from 'rxjs/Rx';

import { FileDetails, MediaApiConfig } from '../';
import { splitFileIntoPieces, FilePiece } from './upload/filePiece';
import { UploadEvent, UploadProgressEvent, UploadEndEvent, UploadFinalizeReadyEvent } from './upload/uploadEvents';
import { Chunk } from './upload/chunk';
import { Hasher } from './upload/hasher';
import { createHasher } from './upload/createHasher';
import { UploadRequests, ChunkProbeResult } from './upload/uploadRequests';

export interface UploadParameters {
  collectionName?: string;
  fetchMetadata?: boolean;
  autoFinalize?: boolean;
}

export class UploadService {
  private readonly hasher: Hasher;
  private readonly requests: UploadRequests;

  constructor(private readonly config: MediaApiConfig, private readonly clientId: string) {
    this.hasher = createHasher();
    this.requests = new UploadRequests(this.config, this.clientId);
  }

  upload(file: File, parameters: UploadParameters): Observable<UploadEvent> {
    const { autoFinalize } = parameters;
    const chunks: Array<Chunk> = [];

    return this.uploadChunks(file, chunks)
    .concat(this.prepareFileFinalize(autoFinalize))
    .concat(this.finalizeFile(file, chunks, parameters));
  }


  // Uploading to Media API

  private uploadChunks(file: File, chunks: Array<Chunk>): Observable<UploadEvent> {
    return this.uploadChunksToMediaApi(file)  // upload all chunks to Media API
      .map((chunk) => {
        chunks.push(chunk);
        return chunk.size;
      })
      .scan((total, current) => total + current, 0)
      .map((progress) => {
        const progressEvent: UploadProgressEvent = {
          type: 'progress',
          bytesUploaded: progress,
          totalBytes: file.size
        };

        return progressEvent;
      });
  }

  private uploadChunksToMediaApi(file: File): Observable<Chunk> {
    const piecesInGroup = 10;

    return Observable.from(splitFileIntoPieces(file))
      .bufferCount(piecesInGroup)  // split to group of pieces
      .concatMap(group => this.uploadGroup(group));  // upload each group independently one-by-one
  }

  private uploadGroup(group: Array<FilePiece>): Observable<Chunk> {
    return Observable.from(group)
      .flatMap(piece => this.hashPiece(piece))  // hash each piece
      .bufferCount(group.length)  // combine them back for batch probing
      .flatMap(chunks => this.probeChunks(chunks))  // probe a group of chunks
      .flatMap(probingResult => this.uploadChunk(probingResult));  // upload chunks
  }

  private hashPiece(piece: FilePiece): Observable<Chunk> {
    return Observable.fromPromise(this.hasher.hash(piece));
  }

  private probeChunks(chunks: Array<Chunk>): Observable<ChunkProbeResult> {
    return Observable.fromPromise(this.requests.probeChunks(chunks))
      .flatMap(a => a);
  }

  private uploadChunk(chunkProbingResult: ChunkProbeResult): Observable<Chunk> {
    const { chunk, exists } = chunkProbingResult;

    if (exists) {
      return Observable.of(chunk);
    }

    return Observable.fromPromise(this.requests.uploadChunk(chunk).then(() => chunk));
  }


  // File finalization

  private prepareFileFinalize(autoFinalize?: boolean): Observable<UploadEvent> {
    if (autoFinalize === false) {
      return new Observable<UploadEvent>((subscriber) => {
        const completeCallback = () => { subscriber.complete(); };

        const finalizeReadyEvent: UploadFinalizeReadyEvent = {
          type: 'finalize-ready',
          callback: completeCallback
        };
        subscriber.next(finalizeReadyEvent);
      });
    }

    return Observable.empty();
  }

  private finalizeFile(file: File, chunks: Array<Chunk>, params: UploadParameters): Observable<UploadEvent> {
    const { collectionName } = params;

    return Observable.defer(() => Observable.fromPromise(this.createFileFromUpload(file, chunks, params, collectionName)))
      .flatMap(fileId => this.processFile(file, fileId, params));
  }

  private createFileFromUpload(file: File, chunks: Array<Chunk>, params: UploadParameters, collectionName?: string): Promise<string> {
    return this.requests.createUpload()
      .then(uploadId => this.requests.appendChunksToUpload(uploadId, chunks))
      .then(uploadId => this.requests.createFileFromUpload(uploadId, file.name, file.type, collectionName));
  }

  private processFile(file: File, fileId: string, params: UploadParameters): Observable<UploadEvent> {
    if (params.fetchMetadata) {
      return Observable.of({ type: 'needs-conversion' } as UploadEvent)
        .concatMap(() => this.completeWithFetching(fileId, params.collectionName));
    }

    return this.completeWithoutFetching(fileId, file);
  }

  private completeWithFetching(fileId: string, collectionName?: string): Observable<UploadEvent> {
    return Observable.defer(() => Observable.fromPromise(this.requests.pollForFileMetadata(fileId, collectionName)))
      .map((details: FileDetails) => {
        const event: UploadEndEvent = {
          type: 'end',
          fileDetails: details
        };

        return event;
      });
  }

  private completeWithoutFetching(fileId: string, file: File): Observable<UploadEvent> {
    const event: UploadEndEvent = {
      type: 'end',
      fileDetails: { id: fileId, name: file.name, mimeType: file.type }
    };

    return Observable.of(event);
  }
}
