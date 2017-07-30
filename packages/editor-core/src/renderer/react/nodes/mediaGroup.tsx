import * as React from 'react';
import { ReactElement, PureComponent } from 'react';
import { FilmStripNavigator } from '@atlaskit/media-filmstrip';
import styled from 'styled-components';
import { Props as MediaProps } from '../../../ui/Media/MediaComponent';

export interface MediaGroupProps {
  children?: any; /* @see https://github.com/Microsoft/TypeScript/issues/6471 */
}

// tslint:disable-next-line
export const FilmStripWrapper = styled.div`
  padding: 5px 0;
`;

export default class MediaGroup extends PureComponent<MediaGroupProps, {}> {
  render() {
    const numChildren = React.Children.count(this.props.children);

    if (numChildren === 1) {
      const card = React.Children.toArray(this.props.children)[0] as ReactElement<any>;
      switch (card.props.type) {
        case 'file':
          return this.renderSingleFile(card);

        case 'link':
        default:
          return this.renderSingleLink(card);
      }
    } else {
      return this.renderStrip();
    }
  }

  renderSingleFile(child: ReactElement<MediaProps>) {
    return React.cloneElement(child, {
      cardDimensions: {
        width: 275,
        height: 180,
      },
      resizeMode: 'full-fit'
    } as MediaProps);
  }

  renderSingleLink(child: ReactElement<MediaProps>) {
    return React.cloneElement(child, {
      cardDimensions: {
        width: 432,
      },
    } as MediaProps);
  }

  renderStrip() {
    return (
      <FilmStripWrapper>
        <FilmStripNavigator>
        {
          React.Children.map(this.props.children, (child: ReactElement<MediaProps>) => {
            switch(child.props.type) {
              case 'file':
                return React.cloneElement(child, {
                  resizeMode: 'crop'
                } as MediaProps);

              default:
              case 'link':
                return React.cloneElement(child, {
                  cardDimensions: {
                    width: 343,
                  },
                } as MediaProps);
            }
          })
        }
        </FilmStripNavigator>
      </FilmStripWrapper>
    );
  }
}
