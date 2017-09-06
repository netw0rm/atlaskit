import * as React from 'react';
import { ReactElement, PureComponent } from 'react';
import styled, { css } from 'styled-components';
import { akGridSize, akColorN30 } from '@atlaskit/util-shared-styles';
import {
  Props as MediaProps,
  MEDIA_HEIGHT,
  FILE_WIDTH,
  LINK_WIDTH,
} from '../../../ui/Media/MediaComponent';

export interface MediaGroupProps {
  children?: React.ReactNode;
}

export interface MediaGroupState {
  animate: boolean;
  offset: number;
  FilmstripView?: React.ComponentClass<any>;
}

export const SINGLE_FILE_WIDTH = 275;
export const SINGLE_FILE_HEIGHT = 180;

export const SINGLE_LINK_WIDTH = 350;
export const SINGLE_LINK_HEIGHT = 300;

const margin = css`
  margin: ${akGridSize} 0;
`;

const center = css`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${akColorN30};
`;

const filmStripItem = css`
  background: ${akColorN30};
  margin-right: ${akGridSize};
  min-height: ${MEDIA_HEIGHT}px;
  flex-shrink: 0;
`;

// tslint:disable-next-line
const FilmStripWrapper = styled.div`
  ${margin}
  min-height: ${MEDIA_HEIGHT}px;
`;

// tslint:disable-next-line
const FilmStripLoaderWrapper = styled.div`
  ${margin}
  display: flex;
  flex-direction: row;
  overflow: hidden;
  min-height: ${MEDIA_HEIGHT}px;
`;

// tslint:disable-next-line
const FilmStripFilePlaceholder = styled.div`
  ${filmStripItem}
  width: ${FILE_WIDTH}px;
`;

// tslint:disable-next-line
const FilmStripLinkPlaceholder = styled.div`
  ${filmStripItem}
  width: ${LINK_WIDTH}px;
`;

// tslint:disable-next-line
const SingleFileWrapper = styled.div`
  ${margin}
  min-height: ${SINGLE_FILE_HEIGHT}px;
  width: ${SINGLE_FILE_WIDTH}px;
  ${center}
  // This is a fix for media component css problem
  .hVlmUn {
    line-height: 0;
  }
`;

// tslint:disable-next-line
const SingleLinkWrapper = styled.div`
  ${margin}
  min-height: ${SINGLE_LINK_HEIGHT}px;
  width: ${SINGLE_LINK_WIDTH}px;
  ${center}
`;

export default class MediaGroup extends PureComponent<MediaGroupProps, MediaGroupState> {

  state: MediaGroupState = {
    animate: false,
    offset: 0
  };

  private handleSize = ({offset}) => this.setState({offset});
  private handleScroll = ({animate, offset}) => this.setState({animate, offset});

  componentWillMount() {
    require.ensure(['@atlaskit/media-card'], (require) => {
      const { FilmstripView } = require('@atlaskit/media-filmstrip');
      this.setState({ FilmstripView });
    });
  }

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
            width: SINGLE_FILE_WIDTH,
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
            width: SINGLE_LINK_WIDTH,
            height: SINGLE_LINK_HEIGHT,
          },
          appearance: 'square'
        } as MediaProps)
      }</SingleLinkWrapper>
    );
  }

  renderStrip() {
    const { children } = this.props;
    const { animate, offset, FilmstripView } = this.state;
    if (!FilmstripView) {
      return (
        <FilmStripLoaderWrapper>{
          React.Children.map(children, (media: ReactElement<MediaProps>) =>
            media.props.type === 'file' ? (
              <FilmStripFilePlaceholder />
            ) : (
              <FilmStripLinkPlaceholder />
            )
          )
        }</FilmStripLoaderWrapper>
      );
    }
    return (
      <FilmStripWrapper>
        <FilmstripView
          animate={animate}
          offset={offset}
          onSize={this.handleSize}
          onScroll={this.handleScroll}
        >
        {
          React.Children.map(children, (child: ReactElement<MediaProps>) => {
            switch(child.props.type) {
              case 'file':
                return React.cloneElement(child, {
                  resizeMode: 'crop'
                } as MediaProps);

              default:
              case 'link':
                return React.cloneElement(child, {
                  cardDimensions: {
                    width: LINK_WIDTH,
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
