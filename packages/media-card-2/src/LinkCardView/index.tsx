import * as React from 'react';
import {LinkViewModel} from '../types';
// import {LinkHorizontalView} from '../views/FileView';

export interface LinkCardViewProps extends LinkViewModel {
}

export class LinkCardView extends React.Component<LinkCardViewProps, {}> {

  render() {
    return (
      <h1>Link card...</h1>
    );
  }

}
