import { FileItem } from '@atlaskit/media-core';

import { MediaFileAttributesFactory } from '../../../src/domain/media-file-attributes';

describe('MediaFileAttributes', () => {
  describe('fromFileItem', () => {
    const serviceHost = 'https://filestore.io';

    it('should return binary url given no artifacts', () => {
      const attributes = MediaFileAttributesFactory.fromFileItem(Mocks.basicFile, serviceHost);
      expect(attributes.id).toBe('basic-file');
      expect(attributes.src).toBe('https://filestore.io/file/basic-file/binary');
      expect(attributes.srcDownload).toBe('https://filestore.io/file/basic-file/binary?dl=1');
      expect(attributes.type).toBe(undefined);
      expect(attributes.title).toBe(undefined);
      expect(attributes.src_hd).toBe(undefined);
      expect(attributes.poster).toBe(undefined);
    });

    it('should return binary url given gif file', () => {
      const attributes = MediaFileAttributesFactory.fromFileItem(Mocks.gifFile, serviceHost);
      expect(attributes.id).toBe('gif-file');
      expect(attributes.src).toBe('https://filestore.io/file/gif-file/binary');
      expect(attributes.srcDownload).toBe('https://filestore.io/file/gif-file/binary?dl=1');
      expect(attributes.type).toBe('image/gif');
      expect(attributes.title).toBe('Some GIF');
    });

    it('should return image url given jpg file', () => {
      const attributes = MediaFileAttributesFactory.fromFileItem(Mocks.jpgFile, serviceHost);
      expect(attributes.id).toBe('jpg-file');
      expect(attributes.src).toBe('https://filestore.io/file/jpg-file/image');
      expect(attributes.srcDownload).toBe('https://filestore.io/file/jpg-file/binary?dl=1');
      expect(attributes.type).toBe(undefined);
      expect(attributes.title).toBe('Some JPG');
    });

    it('should return type video/mp4 given SD video', () => {
      const attributes = MediaFileAttributesFactory.fromFileItem(Mocks.sdVideoFile, serviceHost);
      expect(attributes.id).toBe('sd-file');
      expect(attributes.src).toBe('https://filestore.io/file/hd-file/artifact/video_640.mp4/binary');
      expect(attributes.srcDownload).toBe('https://filestore.io/file/sd-file/binary?dl=1');
      expect(attributes.type).toBe('video/mp4');
      expect(attributes.title).toBe('Some SD Video');
      expect(attributes.src_hd).toBe(undefined);
      expect(attributes.poster).toBe('https://filestore.io/file/hd-file/artifact/poster_640.mp4/binary');
    });

    it('should return HD url and HD poster given HD artifacts exists', () => {
      const attributes = MediaFileAttributesFactory.fromFileItem(Mocks.hdVideoFile, serviceHost);
      expect(attributes.id).toBe('hd-file');
      expect(attributes.src).toBe('https://filestore.io/file/hd-file/artifact/video_640.mp4/binary');
      expect(attributes.srcDownload).toBe('https://filestore.io/file/hd-file/binary?dl=1');
      expect(attributes.type).toBe('video/mp4');
      expect(attributes.title).toBe('Some HD Video');
      expect(attributes.src_hd).toBe('https://filestore.io/file/hd-file/artifact/video_1280.mp4/binary');
      expect(attributes.poster).toBe('https://filestore.io/file/hd-file/artifact/poster_1280.mp4/binary');
    });

    it('should return download url from binary', () => {
      const attributes = MediaFileAttributesFactory.fromFileItem(Mocks.basicFile, serviceHost);
      expect(attributes.srcDownload).toBe('https://filestore.io/file/basic-file/binary?dl=1');
    });
  });
});

class Mocks {
  static basicFile = {
    details: {
      id: 'basic-file'
    }
  } as FileItem;

  static gifFile = {
    details: {
      id: 'gif-file',
      name: 'Some GIF',
      mimeType: 'image/gif'
    }
  } as FileItem;

  static jpgFile = {
    details: {
      id: 'jpg-file',
      name: 'Some JPG',
      mimeType: 'image/jpeg'
    }
  } as FileItem;

  static sdVideoFile = {
    type: 'file',
    details: {
      id: 'sd-file',
      name: 'Some SD Video',
      mediaType: 'video',
      artifacts: {
        'video_640.mp4': {
          url: '/file/hd-file/artifact/video_640.mp4/binary'
        },
        'poster_640.jpg': {
          url: '/file/hd-file/artifact/poster_640.mp4/binary'
        }
      }
    }
  } as FileItem;

  static hdVideoFile = {
    type: 'file',
    details: {
      id: 'hd-file',
      name: 'Some HD Video',
      mediaType: 'video',
      artifacts: {
        'video_640.mp4': {
          url: '/file/hd-file/artifact/video_640.mp4/binary'
        },
        'video_1280.mp4': {
          url: '/file/hd-file/artifact/video_1280.mp4/binary'
        },
        'poster_640.jpg': {
          url: '/file/hd-file/artifact/poster_640.mp4/binary'
        },
        'poster_1280.jpg': {
          url: '/file/hd-file/artifact/poster_1280.mp4/binary'
        }
      }
    }
  } as FileItem;
}
