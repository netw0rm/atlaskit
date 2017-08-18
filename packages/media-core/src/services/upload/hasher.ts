import { FilePiece } from './filePiece';
import { Chunk } from './chunk';

export interface Hasher {
  hash(piece: FilePiece): Promise<Chunk>;
}
