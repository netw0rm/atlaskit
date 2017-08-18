/* tslint:disable no-var-requires */
const rusha = require('rusha');

import { Hasher } from './hasher';
import { Chunk } from './chunk';
import { FilePiece } from './filePiece';

export class SimpleHasher implements Hasher {
  hash(piece: FilePiece): Promise<Chunk> {
    return new Promise((resolve, reject) => {
      const { file, startByte, endByte } = piece;
      const blob = file.slice(startByte, endByte);

      const fileReader = new FileReader();
      fileReader.onload = (event) => {
        const arrayBuffer = (event.target as FileReader).result;
        const hash = new rusha(4 * 1024 * 1024).digestFromArrayBuffer(arrayBuffer);
        resolve(hash);
      };

      fileReader.readAsArrayBuffer(blob);
    });
  }
}
