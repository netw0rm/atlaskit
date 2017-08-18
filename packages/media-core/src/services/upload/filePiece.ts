export const size = 4 * 1024 * 1024;

export interface FilePiece {
  readonly file: File;
  readonly startByte: number;
  readonly endByte: number;
}

export const splitFileIntoPieces = (file: File): Array<FilePiece> => {
  let startIndex = 0;
  const result: Array<FilePiece> = [];

  while (startIndex < file.size) {
    const endIndex = Math.min(startIndex + size, file.size);
    result.push({ file, startByte: startIndex, endByte: endIndex });
    startIndex = endIndex;
  }

  return result;
};
