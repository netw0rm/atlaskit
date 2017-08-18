import { Hasher } from './hasher';
import { SimpleHasher } from './simpleHasher';
import { WorkerHasher } from './workerHasher';

export const createHasher = (): Hasher => {
  let hasher: Hasher;

  try {
    hasher = new WorkerHasher(3);
  } catch (ignored) {
    hasher = new SimpleHasher();
  }

  return hasher;
};
