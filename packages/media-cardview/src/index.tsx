import * as React from 'react';
import styled from 'styled-components';
import {Root} from './styles';
import {Component, MouseEvent} from 'react';
import {Actions} from '@atlaskit/media-domain';

/* Child stateless components*/
import {CardContent} from './cardContent';
import {CardOverlay} from './cardOverlay';
import {MediaTypes} from '@atlaskit/media-domain';
import {CardViewSmall} from './cardViewSmall/cardViewSmall';

export {
  CardViewSmall
};

export interface CardViewProps {
  height?: number;
  width?: number;

  mediaName?: string;
  mediaType: MediaTypes.MediaType;
  mediaSize?: number;

  dataURI?: string;
  progress?: number;
  loading?: boolean;

  selectable?: boolean;
  selected?: boolean;

  menuActions?: Array<Actions.CardAction>;
  onClick?: (event: Event) => void;

  error?: string;
}

export const DEFAULT_CARD_DIMENSIONS = {
  WIDTH: 156,
  HEIGHT: 104
};

const Card = styled(Root)`
  background: #fff;
  display: table;
  font-family: sans-serif;
  border-radius: 3px;
  cursor: pointer;
  line-height: normal;
  position: relative;
  width: ${props => props.width};
  height: ${props => props.height};
`;

const Wrapper = styled.div`
  background: #E5E8EC;
  display: block;
  height: inherit;
  overflow: hidden;
  position: relative;
  border-radius: 3px;
`;

const ImgWrapper = styled.div`
  position: relative;
  width: inherit;
  height: inherit;
  display: block;

  .spinner {
    width: 30px;
    height: 30px;
  }

  img {
    position: absolute;
    top: 50%;
    left: 50%;
    max-height: 100%;
    max-width: 100%;
    display: block;
    transform: translate(-50%, -50%);
  }
`;

export class CardView extends Component<CardViewProps, {}> {
  render() {
    const height = this.props.height || DEFAULT_CARD_DIMENSIONS.HEIGHT;
    const width = this.props.width || DEFAULT_CARD_DIMENSIONS.WIDTH;

    return (
      <Card width={`${width}px`} height={`${height}px`} onClick={this.onClick.bind(this)}>
        <Wrapper>
          <ImgWrapper>
            <CardContent
              loading={this.props.loading}
              mediaType={this.props.mediaType}
              dataURI={this.props.dataURI}
            />
          </ImgWrapper>
        </Wrapper>
        <CardOverlay
          selectable={this.props.selectable}
          selected={this.props.selected}

          mediaName={this.props.mediaName}
          mediaType={this.props.mediaType}
          mediaSize={this.props.mediaSize}
          progress={this.props.progress}

          menuActions={this.props.menuActions}
        />
      </Card>
    );
  }

  onClick(event: MouseEvent<HTMLDivElement>) {
    this.props.onClick && this.props.onClick(event.nativeEvent);
  }
}

export default CardView;
