import { customCategory, customType } from '../src/constants';
import EmojiRepository from '../src/api/EmojiRepository';
import { denormaliseEmojiServiceResponse } from '../src/api/EmojiLoader';
import { EmojiDescription, EmojiDescriptionWithVariations, EmojiServiceDescription, EmojiServiceResponse } from '../src/types';
import { mockEmojiResourceFactory, MockEmojiResource, MockEmojiResourceConfig } from './MockEmojiResource';

export const spriteEmoji: EmojiDescription = {
  id: 'grimacing',
  shortName: ':grimacing:',
  name: 'Grimacing',
  type: 'standard',
  category: 'PEOPLE',
  order: 666,
  representation: {
    sprite: {
      url: 'https://path-to-spritesheet.png',
      row: 6,
      column: 6,
      height: 1024,
      width: 1024,
    },
    xIndex: 1,
    yIndex: 1,
    x: 123,
    y: 456,
    height: 72,
    width: 72,
  },
};

export const imageEmoji: EmojiDescription = {
  id: 'grimacing',
  shortName: ':grimacing:',
  name: 'Grimacing',
  type: 'standard',
  category: 'PEOPLE',
  order: 777,
  representation: {
    imagePath: 'https://path-to-image.png',
    width: 24,
    height: 24,
  },
};

export const testMediaBaseUrl = 'https://media.example.com/';

export const mediaEmojiImagePath = `${testMediaBaseUrl}path-to-image.png`;

export const mediaServiceEmoji: EmojiServiceDescription = {
  id: 'media',
  shortName: ':media:',
  name: 'Media example',
  fallback: ':media:',
  type: customType,
  category: customCategory,
  order: -2,
  representation: {
    imagePath: mediaEmojiImagePath,
    width: 24,
    height: 24,
  },
};

export const mediaEmoji: EmojiDescriptionWithVariations = {
  id: 'media',
  shortName: ':media:',
  name: 'Media example',
  fallback: ':media:',
  type: customType,
  category: customCategory,
  order: -2,
  representation: {
    mediaPath: mediaEmojiImagePath,
    width: 24,
    height: 24,
  },
  skinVariations: [],
};

export const siteUrl = 'https://example.com/emoji/site/blah';

export const siteServiceConfig = {
  url: siteUrl,
};

export const expiresAt = (offsetSeconds: number = 0): number => Math.floor(Date.now() / 1000) + offsetSeconds;

export const defaultMediaApiToken = () => ({
  url: testMediaBaseUrl,
  clientId: '1234',
  jwt: 'abcd',
  collectionName: 'emoji-collection',
  expiresAt: expiresAt(60), // seconds since Epoch UTC
});

export const loadedMediaImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAETklEQVR4nO2XW4hVZRTHf+vb++x9rp2ZcdKZNLWSKbMoI4Ve6iFBMMhCu4BBhZkUVmQKRkqkL9qFtAS7UElPooT0VEE9SEGFUFDZeMlIrWnGcWYc54xnX87+Vg/7mI7KpNPAvMzeb3uvvb/fty7/9S3pOvaQMiaXIuLjqlbHZn0UsLggYwQAIJgxXB1gHGAcYBxgHAB3pB+qgq13ESMg5wmqtalNKrmCMRfajBhAFbK+4GbSP4ahEseKSPpOFfI5IZMRqD8LAiWKFHOezy8bQBUyGaH9QEhnVw2AthkeLS0ZokhxXfA94edfQ9oPhISBZUKTy223ZmltzTA4aId44rIBrIVcTvjk01Ps3N2PAOvXTWTxfR5RrCQJrN/YzedfVohrilowDjQ1OKxc0cz8eQUqg2c9MaIkVAXfF4pFQ7FoyLiCTVK3v/tBLzt3n8LzBN8TSiWD6woDFcuqtZ3s/aFKPm+w9n8AnIGwtp5sNg3L8eM1vtozSGOjQ8aF1c81s/2dydx/TwlVeOLRBqZd7RFF+m8YRlwFQ2AAx4X+U5YgSBNyxnSPhxeXCSPlqWUTWDC/xC03Z6kGZxMWRkkHBLAJlIoG3xM8T/j9SMyHH/cRVC3lsmHWzCy9fcmQxUcNAIEoVlomucy9PUd/f4LnCVu29bDsmQ527DpJ38mEhganrg2jDUAqMmGkrFjexJzZObpP1PB9w+E/IjZt7mHp03/x2RcDFAoyBGJUAeJYKZcdtrzWwoonmyhfYQgCJZ8zdPfUWPNyFzt29VMsGGyilw6gCknCBe67CAZBYHEcYfnSJj7aNpkXn2+mZZKDVSiXHd7f3sfRYxGeb7B6CQDWgusKDWWD40CSKNZeXNczGaFYTOM8MGDJ5gwPLirz3ltX0XadR5IolUFL+/4Q309DMSyAtVDIGyqVhFff7Kbj7xoTJ7rkc0KlLqkigusKAlQqCZu3nmD1S52oahqCUJk61eOaaR5hvf7DWNNhQIfRAWtTZftu7yAbNp3gz46YffsjHl/SQEdnzPd7q+RzhjhSpkzOALBuQxdff1ulVDI8u6qTRQtLNE9w+fGngD3fDFIspDkxdYpHrZZuf1ghshaaGl2iKE2kA4dCVq3tAtJ+0NObMO+uAjPbfMJIeeyRRg7+FlE5bWk/GPLKxgDHFZKaks0aevsS7l1Q4qZZPqcDi2OGCYExEITK9W0+W99o5YY2L2219TuKlLvvLLDmhStRoFq13DE3z9uvtzJndg7fE0SEWqwYI7guLHmgzJqVzdRqZ+cx6Ty6cNjcPtP94lj5ZV9AR2cNIzB1SoYbZ2axmpafMWml5HNpch06HHHkaEQ1UEpFw4xrPaZP86gGSpIoIulw+p8AKUS6i1xWcFwBhVpNqQZKOuXKEFsR+ffAIpI2qyhWwtAiIvUKqk/HlyIFZ3r34GlF62IgAub84805tkGo2EBBqVcLGOOcY6mA4R9UsuXGHAxHAwAAAABJRU5ErkJggg==';

declare var require: {
    <T>(path: string): T;
};

// tslint:disable-next-line:no-var-requires
export const standardServiceEmojis: EmojiServiceResponse = require('./test-emoji-standard.json') as EmojiServiceResponse;
// tslint:disable-next-line:no-var-requires
export const atlassianServiceEmojis: EmojiServiceResponse = require('./test-emoji-atlassian.json') as EmojiServiceResponse;
export const siteServiceEmojis = (): EmojiServiceResponse => ({
  emojis: [ mediaServiceEmoji ],
  meta: {
    mediaApiToken: defaultMediaApiToken(),
  },
});

export const standardEmojis: EmojiDescription[] = denormaliseEmojiServiceResponse(standardServiceEmojis).emojis;
export const atlassianEmojis: EmojiDescription[] = denormaliseEmojiServiceResponse(atlassianServiceEmojis).emojis;
export const siteEmojis: EmojiDescription[] = [ mediaEmoji ];
export const emojis: EmojiDescription[] = [ ...standardEmojis, ...atlassianEmojis, ...siteEmojis ];

export const emojiRepository = new EmojiRepository(emojis);

export const grinEmoji = emojiRepository.findByShortName(':grin:') as EmojiDescriptionWithVariations;
export const evilburnsEmoji = emojiRepository.findByShortName(':evilburns:') as EmojiDescriptionWithVariations;
export const thumbsupEmoji = emojiRepository.findByShortName(':thumbsup:') as EmojiDescriptionWithVariations;
export const thumbsdownEmoji = emojiRepository.findByShortName(':thumbsdown:') as EmojiDescriptionWithVariations;
export const standardBoomEmoji = emojiRepository.findById('1f4a5') as EmojiDescriptionWithVariations;
export const atlassianBoomEmoji = emojiRepository.findById('atlassian-boom') as EmojiDescriptionWithVariations;

export const getEmojiResourcePromise = (config?: MockEmojiResourceConfig): Promise<MockEmojiResource> => mockEmojiResourceFactory(emojiRepository, config);

export const generateSkinVariation = (base: EmojiDescription, idx: number): EmojiDescription => {
  const { id, shortName, name } = base;
  return {
    id: `${id}-${idx}`,
    shortName: `${shortName.substring(0, shortName.length - 1)}-${idx}:`,
    name: `${name} ${idx}`,
    type: 'SITE',
    category: 'CHEESE',
    representation: {
      imagePath: `https://path-to-skin-variation-tone${idx}.png`,
      width: 24,
      height: 24,
    },
  };
};

export const blobResponse = (blob: Blob) => ({
  body: blob,
  sendAsJson: false,
});
