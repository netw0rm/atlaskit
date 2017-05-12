import * as React from 'react';
import {MediaItemType, MediaItemDetails} from '@atlaskit/media-core';
import {SharedCardProps, CardProcessingStatus} from '.';
import {SmallView} from './small';
import {StandardView} from './standard';

export interface CardViewProps extends SharedCardProps {
  readonly status: CardProcessingStatus;
  readonly mediaItemType?: MediaItemType;
  readonly metadata?: MediaItemDetails;

  // allow extra props to be passed down to lower views e.g. dataURI to FileCard
  [propName: string]: any;
}

export const CardView = (props: CardViewProps): JSX.Element => { // tslint:disable-line:variable-name
  const {appearance, status, mediaItemType: type, metadata, ...otherProps} = props;

  if (appearance === 'small') {
    return (
      <SmallView {...otherProps} status={status} type={type || 'link'} metadata={metadata}/>
    );
  } else {
    return (
      <StandardView {...otherProps} status={status} type={type || 'link'} metadata={metadata}/>
    );
  }

};
