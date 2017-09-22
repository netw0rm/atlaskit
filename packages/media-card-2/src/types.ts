import {
  Context,
  MediaType,
  FileDetails,
  LinkDetails,
  UrlPreview
} from '@atlaskit/media-core';
import {Action} from './utils/Actions';

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

export type Status =

  // we're waiting for the details to be received by the server
  'uploading' |

  // we're waiting for the details from the server
  'loading' |

  // we're waiting for the finalized details from the server
  'waiting' |

  // we've received the finalized details from the server
  'loaded' |

  // we've encountered an error retrieving any details from the server
  'errored'

;

export type Details = FileDetails | LinkDetails | UrlPreview;

export {Context, FileDetails, LinkDetails, UrlPreview, MediaType};

export interface LinkViewModel {
  status: Status;
  title?: string;
  actions?: Action[];
}
