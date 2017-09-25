import * as React from 'react';
import {LinkCardGenericView} from '../../../../links/cardGenericView';

export interface ErroredViewProps {
}

export class ErroredView extends React.Component<ErroredViewProps, {}> {
  render() {
    return (
      <LinkCardGenericView
        appearance="square"
        errorMessage={'error'}
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
