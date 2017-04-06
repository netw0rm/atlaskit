import { FileItem } from '@atlaskit/media-core';
import { expect } from 'chai';

import { MediaFile } from '../../src/domain/media-file';

describe('MediaFile', () => {
  describe('fromFileItem', () => {
    const serviceHost = 'https://filestore.io';

    it('should return binary url given no artifacts', () => {
      const mediaFile = MediaFile.fromFileItem(Mocks.basicFile, serviceHost);
      expect(mediaFile.src).to.be.equal('https://filestore.io/file/basic-file/binary');
      expect(mediaFile.srcDownload).to.be.equal('https://filestore.io/file/basic-file/binary&dl=1');
      expect(mediaFile.type).to.be.undefined;
      expect(mediaFile.title).to.be.undefined;
      expect(mediaFile.src_hd).to.be.undefined;
      expect(mediaFile.poster).to.be.undefined;
    });

    it('should return binary url given gif file', () => {
      const mediaFile = MediaFile.fromFileItem(Mocks.gifFile, serviceHost);
      expect(mediaFile.src).to.be.equal('https://filestore.io/file/gif-file/binary');
      expect(mediaFile.srcDownload).to.be.equal('https://filestore.io/file/gif-file/binary&dl=1');
      expect(mediaFile.type).to.be.equal('image/gif');
      expect(mediaFile.title).to.be.equal('Some GIF');
    });

    it('should return type video/mp4 given SD video', () => {
      const mediaFile = MediaFile.fromFileItem(Mocks.sdVideoFile, serviceHost);
      expect(mediaFile.src).to.be.equal('https://filestore.io/file/hd-file/artifact/video_640.mp4/binary');
      expect(mediaFile.srcDownload).to.be.equal('https://filestore.io/file/sd-file/binary&dl=1');
      expect(mediaFile.type).to.be.equal('video/mp4');
      expect(mediaFile.title).to.be.equal('Some SD Video');
      expect(mediaFile.src_hd).to.be.undefined;
      expect(mediaFile.poster).to.be.equal('https://filestore.io/file/hd-file/artifact/poster_640.mp4/binary');
    });

    it('should return HD url and HD poster given HD artifacts exists', () => {
      const mediaFile = MediaFile.fromFileItem(Mocks.hdVideoFile, serviceHost);
      expect(mediaFile.src).to.be.equal('https://filestore.io/file/hd-file/artifact/video_640.mp4/binary');
      expect(mediaFile.srcDownload).to.be.equal('https://filestore.io/file/hd-file/binary&dl=1');
      expect(mediaFile.type).to.be.equal('video/mp4');
      expect(mediaFile.title).to.be.equal('Some HD Video');
      expect(mediaFile.src_hd).to.be.equal('https://filestore.io/file/hd-file/artifact/video_1280.mp4/binary');
      expect(mediaFile.poster).to.be.equal('https://filestore.io/file/hd-file/artifact/poster_1280.mp4/binary');
    });

    it('should return download url from binary', () => {
      const mediaFile = MediaFile.fromFileItem(Mocks.basicFile, serviceHost);
      expect(mediaFile.srcDownload).to.be.equal('https://filestore.io/file/basic-file/binary&dl=1');
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
