import * as React from 'react';
import { ReactElement, PureComponent } from 'react';
import { FilmstripView } from '@atlaskit/media-filmstrip';
import styled, { css } from 'styled-components';
import { akGridSize } from '@atlaskit/util-shared-styles';
import { Props as MediaProps } from '../../../ui/Media/MediaComponent';

export interface MediaGroupProps {
  children?: React.ReactNode;
}

export interface MediaGroupState {
  animate: boolean;
  offset: number;
}

export const SINGLE_FILE_HEIGHT = 180;
export const SINGLE_LINK_HEIGHT = 116;

const padding = css`
  padding: ${akGridSize} 0;
`;

// tslint:disable-next-line
const FilmStripWrapper = styled.div`
  ${padding}
`;

// tslint:disable-next-line
const SingleFileWrapper = styled.div`
  ${padding}
  min-height: ${SINGLE_FILE_HEIGHT}px;
`;

// tslint:disable-next-line
const SingleLinkWrapper = styled.div`
  ${padding}
  min-height: ${SINGLE_LINK_HEIGHT}px;
`;

export default class MediaGroup extends PureComponent<MediaGroupProps, MediaGroupState> {

  state: MediaGroupState = {
    animate: false,
    offset: 0
  };

  private handleSize = ({offset}) => this.setState({offset});
  private handleScroll = ({animate, offset}) => this.setState({animate, offset});


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
    return (
      <SingleFileWrapper>{
        React.cloneElement(child, {
          cardDimensions: {
            width: 275,
            height: SINGLE_FILE_HEIGHT,
          },
          resizeMode: 'full-fit'
        } as MediaProps)
      }</SingleFileWrapper>
    );
  }

  renderSingleLink(child: ReactElement<MediaProps>) {
    return (
      <SingleLinkWrapper>{
        React.cloneElement(child, {
          cardDimensions: {
            width: 350,
            height: 300,
          },
          appearance: 'square'
        } as MediaProps)
      }</SingleLinkWrapper>
    );
  }

  renderStrip() {
    const {animate, offset} = this.state;
    return (
      <FilmStripWrapper>
        <FilmstripView
          animate={animate}
          offset={offset}
          onSize={this.handleSize}
          onScroll={this.handleScroll}
        >
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
        </FilmstripView>
      </FilmStripWrapper>
    );
  }
}
