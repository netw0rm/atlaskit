import * as React from 'react';
import {Component} from 'react';
import {CardAction, MediaType} from '@atlaskit/media-core';

import {LinkCardViewHorizontalWrapper, Details} from './styled';
import {Ellipsify} from '..';
import {MoreBtn} from '../cardOverlay/styled';


export interface LinkCardViewHorizontalProps {
  height?: number;
  width?: number;

  title?: string;
  description?: string;
  linkUrl?: string;
  imageUrl?: string;
  icon?: string;

  loading?: boolean;

  menuActions?: Array<CardAction>;
  onClick?: (event: Event) => void;

  error?: string;
}

export const DEFAULT_LINK_CARD_DIMENSIONS = {
  WIDTH: 435,
  HEIGHT: 116
};

export class LinkCardViewHorizontal extends Component<LinkCardViewHorizontalProps, {}> {
  render() {
    const {title, description, linkUrl, imageUrl, icon} = this.props;

    const height = this.props.height || DEFAULT_LINK_CARD_DIMENSIONS.HEIGHT;
    const width = this.props.width || DEFAULT_LINK_CARD_DIMENSIONS.WIDTH;
    const cardStyle = {height: `${height}px`, width: `${width}px`};

    return (
      <LinkCardViewHorizontalWrapper style={cardStyle} >
        <img src={imageUrl} alt={title} />
        <Details>
          <h3>{title}</h3>
          <Ellipsify text={description} lines={2} />
          <img src={icon} alt={icon} />
          <a href={linkUrl} rel="noopener">{linkUrl}</a>
        </Details>
      </LinkCardViewHorizontalWrapper>
    );
  }
}

export default LinkCardViewHorizontal;
