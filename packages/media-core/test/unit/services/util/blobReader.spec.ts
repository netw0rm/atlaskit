import {readBlob} from '../../../../src/services/util/blobReader';

describe('readBlob', () => {
  it('should return a base64 data uri', async () => {
    await expect(readBlob(new Blob(['hello world']))).resolves.toEqual('data:;base64,aGVsbG8gd29ybGQ=');
  });
});
