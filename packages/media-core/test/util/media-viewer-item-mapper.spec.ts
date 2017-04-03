import { expect } from 'chai';
import { FileItem, LinkItem } from '../../src/item';
import MediaViewerItemMapper from '../../src/util/media-viewer-item-mapper';
import { MediaType } from '../../src/mediaTypes';

describe('MediaViewerItemMapper', () => {
  describe('fromMediaItem', () => {
    it('should return undefined for partial files', () => {
      expect(MediaViewerItemMapper.fromMediaItem(Mocks.partialFile))
        .to.be.undefined;
    });

    it('should return image/gif for files with mime type image/gif', () => {
      expect(MediaViewerItemMapper.fromMediaItem(Mocks.gifFile))
        .to.be.equal('image/gif');
    });

    it('should return correct media viewer item type for various media types', () => {
      expect(MediaViewerItemMapper.fromMediaItem(Mocks.fileFromMediaType('doc')))
        .to.be.equal('application/pdf');
      expect(MediaViewerItemMapper.fromMediaItem(Mocks.fileFromMediaType('image')))
        .to.be.equal('image/jpeg');
      expect(MediaViewerItemMapper.fromMediaItem(Mocks.fileFromMediaType('audio')))
        .to.be.equal('audio/mpeg');
      expect(MediaViewerItemMapper.fromMediaItem(Mocks.fileFromMediaType('video')))
        .to.be.equal('video/mp4');
      expect(MediaViewerItemMapper.fromMediaItem(Mocks.fileFromMediaType('archive')))
        .to.be.equal('not/supported');
      expect(MediaViewerItemMapper.fromMediaItem(Mocks.fileFromMediaType('model')))
        .to.be.equal('application/x-sea');
      expect(MediaViewerItemMapper.fromMediaItem(Mocks.fileFromMediaType('unknown')))
        .to.be.equal('not/supported');
    });

    it('should return undefined for links', () => {
      expect(MediaViewerItemMapper.fromMediaItem(Mocks.link))
        .to.be.undefined;
    });
  });
});

class Mocks {
  static partialFile: FileItem = {
    type: 'file',
    details: {}
  };

  static gifFile: FileItem = {
    type: 'file',
    details: {
      mimeType: 'image/gif'
    }
  };

  static fileFromMediaType = (mediaType: MediaType) => {
    return {
      type: 'file',
      details: {
        mediaType
      }
    } as FileItem;
  }

  static link: LinkItem = {
    type: 'link',
    details: {
      id: 'f57b5f1e-d9f6-489a-aad0-04ea4da14e07',
      type: 'image',
      url: 'https://i.vimeocdn.com/portrait/58832_300x300',
      title: '58832_300x300'
    }
  };
}
