import { DataUri } from '../dataUriService';

export function readBlob(blob: Blob): Promise<DataUri> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.addEventListener('load', () => resolve(reader.result));
    reader.addEventListener('error', () => reject(reader.error));

    reader.readAsDataURL(blob);
  });
}
