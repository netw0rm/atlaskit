
import * as React from 'react';
import {MediaItemType, MediaItemDetails} from '@atlaskit/media-core';
import {CardProcessingStatus} from '..';

import {SmallLoadingView} from './loadingView';
import {SmallErrorView} from './errorView';
import {SmallLinkView} from './linkView';
import {SmallFileView} from './fileView';

const NotImplementedYet = () => <div style={{color: 'red'}}>Sorry, this view is not implemented yet.</div>; // tslint:disable-line:variable-name

export interface SmallViewProps {

  readonly type: MediaItemType;
  readonly status: CardProcessingStatus;
  readonly metadata?: MediaItemDetails;

  // allow extra props to be passed down to lower views
  [propName: string]: any;

}

export const SmallView = ({type, status, metadata, ...otherProps}: SmallViewProps): JSX.Element => { // tslint:disable-line:variable-name
  switch (status) {

    case 'uploading':
      return <NotImplementedYet/>;

    case 'loading':
      return <SmallLoadingView icon={type}/>;

    case 'error':
      return <SmallErrorView/>;

    default:
      if (type === 'link') {
        return <SmallLinkView {...otherProps} metadata={metadata}/>;
      } else {
        return <SmallFileView {...otherProps} metadata={metadata}/>;
      }

  }
};
