import * as React from 'react';
import {MediaItemDetails} from '@atlaskit/media-core';

export interface StandardLinkViewProps {
  metadata?: MediaItemDetails;
}

export class StandardLinkView extends React.Component {

  shouldRenderImage

  render(): JSX.Element {

  }

}

export const StandardLinkView = ({metadata}: StandardLinkViewProps): JSX.Element => ( // tslint:disable-line:variable-name
  <div></div>
);
