import * as React from 'react';
import {Wrapper, Iframe} from './styled';

export interface EmbedCardProps {
  url: string;
  aspectRatio?: number;
  width?: number;
  height?: number;

}

export interface EmbedCardState {
}

export class EmbedCard extends React.Component<EmbedCardProps, EmbedCardState> {

  render() {
    const {url, aspectRatio, width, height} = this.props;
    return (
      <Wrapper aspectRatio={aspectRatio} width={width} height={height}>
        <Iframe src={url} allowFullScreen={true}/>
      </Wrapper>
    );
  }

}
