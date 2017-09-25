import {
  Context,
  FileDetails,
  LinkDetails,
  UrlPreview
} from '@atlaskit/media-core';

export {Context};

export interface FileIdentifier {
  readonly type: 'file';
  readonly id: string;
  readonly collection?: string; // files can exist outside of a collection
}

export interface LinkIdentifier {
  readonly type: 'link';
  readonly id: string;
  readonly collection: string; // links always exist within a collection
}

export interface LinkPreviewIdentifier {
  readonly type: 'link';
  readonly url: string;
}

export type Identifier = FileIdentifier | LinkIdentifier | LinkPreviewIdentifier;

export type Status = // TODO: anyone got better names that suit both links and files

  // we're waiting for the item to be created by the server
  'creating' |

  // we're waiting for the item to be processed by the server
  'waiting' |

  // we're waiting for the details from the server
  'loading' |

  // we've received the finalized details from the server
  'loaded' |

  // we've encountered an error retrieving details from the server
  'errored'

;

export {FileDetails, LinkDetails};
export type LinkPreviewDetails = UrlPreview;
export type Details = FileDetails | LinkDetails | LinkPreviewDetails;
