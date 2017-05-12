
import * as React from 'react';
import {MediaItemType, MediaItemDetails, FileDetails} from '@atlaskit/media-core';
import {CardAppearance, CardDimensions, CardProcessingStatus} from '..';

import {StandardWrapper} from './wrapper';
import {StandardUploadingView} from './uploadingView';
import {StandardLoadingView} from './loadingView';
import {StandardErrorView} from './errorView';
import {StandardLinkView} from './linkView';
import {StandardFileView} from './fileView';
import {ImageView} from './imageView';

export interface StandardViewProps {

  readonly type: MediaItemType;
  readonly status: CardProcessingStatus;
  readonly metadata?: MediaItemDetails;

  readonly dataURI?: string;
  readonly progress?: number;
  readonly appearance?: CardAppearance;
  readonly dimensions?: CardDimensions;

  // allow extra props to be passed down to lower views
  [propName: string]: any;

}

const SwitchView = (props: StandardViewProps): JSX.Element => { // tslint:disable-line:variable-name
  const {type, status, metadata, dataURI, progress, appearance} = props;
  switch (status) {

    case 'uploading':
      const title = metadata && (metadata as FileDetails).name || '';
      return <StandardUploadingView title={title} dataURI={dataURI} progress={progress || 0}/>; //TODO: onCancel

    case 'loading':
      return <StandardLoadingView icon={type}/>;

    case 'error':
      return <StandardErrorView/>;

    default:

      if (dataURI) { //appearance === 'image'
        return <ImageView dataURI={dataURI}/>;
      }

      return <div style={{color: 'red'}}>Sorry, this view is not implemented yet.</div>;

  }
};

export const StandardView = (props: StandardViewProps): JSX.Element => { // tslint:disable-line:variable-name
  const {onClick, dimensions, ...otherProps} = props;
  return (
    <StandardWrapper dimensions={dimensions} onClick={onClick}>
      <SwitchView {...otherProps}/>
    </StandardWrapper>
  );
};
