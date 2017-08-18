import { FilePiece } from './filePiece';

export class Chunk {
  constructor(private readonly filePiece: FilePiece, private readonly hash: string) {
  }

  get blob(): Blob {
    const { file, startByte, endByte } = this.filePiece;

    return file.slice(startByte, endByte);
  }

  get size(): number {
    const { startByte, endByte } = this.filePiece;

    return Math.max(endByte - startByte, 0);
  }

  get etag(): string {
    return `${this.hash}-${this.size}`;
  }
}
