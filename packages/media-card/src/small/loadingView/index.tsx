import * as React from 'react';
import {MediaItemType} from '@atlaskit/media-core';

export interface SmallLoadingViewProps {
  icon: MediaItemType;
}

export const SmallLoadingView = ({icon}: SmallLoadingViewProps): JSX.Element => ( // tslint:disable-line:variable-name
  <div></div>
);
