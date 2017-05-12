import * as React from 'react';
import {MediaItemDetails} from '@atlaskit/media-core';
import {CardDimensions} from '../..';
import {MediaImage} from '../../utils/mediaImage';
import {Wrapper} from './styled';

export interface ImageViewProps {
  dataURI: string;
  metadata?: MediaItemDetails;
  dimensions?: CardDimensions; //TODO: pass width/height to MediaImage
}

export class ImageView extends React.Component<ImageViewProps, {}> {

  render(): JSX.Element {
    const {metadata, dataURI} = this.props;
    return (
      <Wrapper>
        <MediaImage dataURI={dataURI}/>
        <div>Overlay</div>
      </Wrapper>
    );
  }

}
