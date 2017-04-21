import * as React from 'react';
import {MediaItemDetails} from '@atlaskit/media-core';

import {SharedCardProps, CardProcessingStatus} from '.';
import {LinkCard} from './links';
import {FileCard} from './files';
import {isLinkDetails} from './utils/isLinkDetails';

export interface CardViewProps extends SharedCardProps {
  readonly status: CardProcessingStatus;
  readonly error?: Error;
  readonly metadata?: MediaItemDetails;

  // allow extra props to be passed down to lower views e.g. dataURI to FileCard
  [propName: string]: any;

}

export const CardView = (props: CardViewProps): JSX.Element => {  // tslint:disable-line:variable-name
  const {status, error, metadata, ...otherProps} = props;

  // if (status === 'loading') {
  //   //TODO: FIL-4039 - show common loading view
  // }
  //
  // if (status === 'error') {
  //   //TODO: FIL-3893 - show common error view
  // }

  if (!metadata || isLinkDetails(metadata)) {
    return (
      <LinkCard
        {...otherProps}
        status={status}
        error={error}
        details={metadata}
      />
    );
  } else {
    return (
      <FileCard
        {...otherProps}
        status={status}
        error={error}
        details={metadata}
      />
    );
  }
};
