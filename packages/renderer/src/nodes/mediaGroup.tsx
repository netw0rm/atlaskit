import * as React from 'react';
import { PureComponent, ReactElement } from 'react';
import { FilmStripNavigator } from '@atlaskit/media-filmstrip';
import { CardDimensions } from '@atlaskit/media-card';
import styled from 'styled-components';
import { MediaProps } from './media';

export enum LargeCard {
  height = 180,
  width = 275
}

// tslint:disable-next-line
export const CardWrapper = styled.div`
  padding: 5px 10px;
`;

export interface Props {
  numOfCards: number;
}

export default class MediaGroup extends PureComponent<Props, {}> {

  render() {
    const { children } = this.props;
    const childrenItems = React.Children.map(children, (child: ReactElement<MediaProps>) => child.props.item);

    return this.props.numOfCards > 1

      ? <FilmStripNavigator>
        {
          React.Children.map(children,
            (child: ReactElement<MediaProps>) => React.cloneElement(child, {
              onClick: (child.props && child.props.onClick) ? child.props.onClick.bind(this, childrenItems) : undefined
            } as MediaProps)
          )
        }
        </FilmStripNavigator>

      : <CardWrapper>
        {
          React.Children.map(children,
            (child: ReactElement<MediaProps>) => React.cloneElement(child, {
              cardDimensions: LargeCard as CardDimensions
            } as MediaProps)
          )
        }
      </CardWrapper>;
  }
}
