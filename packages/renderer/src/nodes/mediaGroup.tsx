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

export default class MediaGroup extends PureComponent<{}, {}> {

  render() {
    const { children } = this.props;
    const { count, map } = React.Children;

    return count(children) > 1
      ? <FilmStripNavigator>{children}</FilmStripNavigator>
      : <CardWrapper>
        {
          map(children, (child: ReactElement<MediaProps>) => React.cloneElement(child, {
            cardDimensions: LargeCard as CardDimensions
          } as MediaProps))
        }
      </CardWrapper>;
  }
}
