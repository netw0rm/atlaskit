import {MediaItemType} from '@atlaskit/media-core';
import {defaultCollectionName} from './collectionNames';

const fileType: MediaItemType = 'file';
const linkType: MediaItemType = 'link';

// === URL PREVIEW ===

export const genericLinkPreviewId = {
  url: 'https://atlassian.com',
  mediaItemType: linkType
};

export const videoUrlPreviewId = {
  url: 'https://www.youtube.com/watch?v=4OkP5_1qb7Y',
  mediaItemType: linkType
};

export const imageUrlPreviewId = {
  url: 'https://i.ytimg.com/vi/iLbyjaF8Cyc/maxresdefault.jpg',
  mediaItemType: linkType
};

export const audioUrlPreviewId = {
  url: 'https://devchat.cachefly.net/javascriptjabber/JSJ243_Immutable.js_with_Lee_Byron.mp3',
  mediaItemType: linkType
};

export const docUrlPreviewId = {
  url: 'https://code.visualstudio.com/shortcuts/keyboard-shortcuts-windows.pdf',
  mediaItemType: linkType
};

export const unknownUrlPreviewId = {
  url: 'https://www.reddit.com/r/javascript/',
  mediaItemType: linkType
};

// === LINK ===

export const genericLinkIdentifier = {
  id: '517dade5-5489-4e8c-a113-42319878c4a5',
  mediaItemType: linkType
};

export const spotifyLinkIdentifier = {
  id: 'b3205cf6-7c26-4208-a1a2-50488bffa973',
  mediaItemType: linkType
};

export const youtubeLinkIdentifier = {
  id: '5c024c78-8dee-4a6c-9967-6276abd80286',
  mediaItemType: linkType
};

export const trelloLinkIdentifier = {
  id: '70997118-3b5a-49f0-8608-43f6e0b9796e',
  mediaItemType: linkType
};

export const twitterLinkIdentifier = {
  id: 'c3e22950-99b2-4f6e-9696-26117310741f',
  mediaItemType: linkType
};

export const linkPlayerIdentifier = {
  id: 'f0e80555-cf97-44ae-afef-9cbfae8c73c7',
  mediaItemType: linkType
};

// === FILE ===

export const genericFileId = {
  id: '2dfcc12d-04d7-46e7-9fdf-3715ff00ba40',
  mediaItemType: fileType,
  collectionName: defaultCollectionName
};

export const videoFileId = {
  id: '1b01a476-83b4-4f44-8192-f83b2d00913a', // mp4 video
  mediaItemType: fileType,
  collectionName: defaultCollectionName
};

export const imageFileId = {
  id: '5556346b-b081-482b-bc4a-4faca8ecd2de', // jpg image
  mediaItemType: fileType,
  collectionName: defaultCollectionName
};

export const docFileId = {
  id: '71cd7e7d-4e86-4b89-a0b4-7f6ffe013c94',
  mediaItemType: fileType,
  collectionName: defaultCollectionName
};

export const unknownFileId = {
  id: 'e0652e68-c596-4800-8a91-1920e6b8a585',
  mediaItemType: fileType,
  collectionName: defaultCollectionName
};
