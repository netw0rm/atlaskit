
import * as React from 'react';
import {LinkCardGenericView} from '../../../../links/cardGenericView';

export interface LoadingViewProps {
}

export class LoadingView extends React.Component<LoadingViewProps, {}> {
  render() {
    return (
      <LinkCardGenericView
        appearance="square"
        isLoading={true}
        linkUrl=""
        iconUrl=""
        thumbnailUrl=""
        site=""
        title=""
        description=""
      />
    );
  }
}
