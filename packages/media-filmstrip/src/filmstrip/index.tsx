import * as React from 'react';
import {Component, ReactElement} from 'react';
import {ImageResizeMode, MediaItemType} from '@atlaskit/media-core';
import {CardDimensions} from '@atlaskit/media-card';
import {FilmstripView} from '../filmstripView';

export interface FilmstripProps {
  children?: any;
}

export interface FilmstripState {

}

const largeCardDimensions: CardDimensions = {
  height: 180,
  width: 275
};

const smallLinkDimensions: CardDimensions = {
  // TODO: Do we need to specify height here?
  // height: 116,
  width: 343
};

export class Filmstrip extends Component<FilmstripProps, FilmstripState> {
  private get childrenLength() {
    const {children} = this.props;
    return React.Children.count(children);
  }

  private getDimensionsFromMediaItemType = (type: MediaItemType): CardDimensions | undefined => {
    const {isSingleItem} = this;
    const isLink = type === 'link';
    const linkDimensions = !isSingleItem ? smallLinkDimensions : undefined;
    const fileDimensions = isSingleItem ? largeCardDimensions : undefined;

    return isLink ? linkDimensions : fileDimensions;
  }

  get resizeMode(): ImageResizeMode {
    const {isSingleItem} = this;
    return isSingleItem ? 'full-fit' : 'crop';
  }

  get isSingleItem(): boolean {
    const {childrenLength} = this;
    return childrenLength === 1;
  }

  getChildProps(child: ReactElement<any>) {
    const {resizeMode, getDimensionsFromMediaItemType} = this;
    const dimensions = getDimensionsFromMediaItemType(child.props.identifier && child.props.identifier.mediaItemType);

    return {
      resizeMode,
      dimensions
    };
  }

  renderContent(length: number) {
    const {children} = this.props;
    const clonedChilds = React.Children.map(children, (child: ReactElement<any>) => {
      return React.cloneElement(child, this.getChildProps(child));
    });

    return clonedChilds;
  }

  render() {
    const content = this.renderContent(this.childrenLength);

    // TODO: pass down FilmstripView props
    return (
      <FilmstripView>
        {content}
      </FilmstripView>
    );
  }
}
