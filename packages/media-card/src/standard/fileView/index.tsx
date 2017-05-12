import * as React from 'react';
import {MediaItemDetails} from '@atlaskit/media-core';

export interface StandardFileViewProps {
  metadata?: MediaItemDetails;
  readonly dataURI?: string;
}

export const StandardFileView = ({metadata, dataURI}: StandardFileViewProps): JSX.Element => ( // tslint:disable-line:variable-name
  <div></div>
);
