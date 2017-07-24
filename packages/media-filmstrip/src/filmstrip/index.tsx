// TODO: Check square appearance
// TODO: fix horizontal no image
import * as React from 'react';
import {Component, ReactElement} from 'react';
import {ImageResizeMode, MediaItemType} from '@atlaskit/media-core';
import {Card, CardView, CardDimensions} from '@atlaskit/media-card';
import {FilmstripView} from '../filmstripView';

export type FilmstripChild = Card | CardView | ChildWithTypeAndId;

export interface FilmstripProps {
  children?: Array<FilmstripChild>;
  // children?: Array<Card | CardView | >;
  enlargeSingleItem?: boolean; // default false
}

export interface ChildWithTypeAndId {
  props: {
    id: string;
    type: MediaItemType;
  };
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

const largeLinkDimensions: CardDimensions = {
  width: 744
};

export class Filmstrip extends Component<FilmstripProps, FilmstripState> {
  private get childrenLength() {
    const {children} = this.props;
    return React.Children.count(children);
  }

  private getDimensionsFromMediaItemType = (type: MediaItemType): CardDimensions | undefined => {
    const {enlargeSingleItem} = this.props;
    const {isSingleItem} = this;
    const isLink = type === 'link';
    const linkDimensions = isSingleItem && enlargeSingleItem ? largeLinkDimensions : smallLinkDimensions;
    const fileDimensions = isSingleItem && enlargeSingleItem ? largeCardDimensions : undefined;

    return isLink ? linkDimensions : fileDimensions;
  }

  private getItemTypeFromChild(child: FilmstripChild): MediaItemType {
    if (child.type === Card) {
      return child.props.identifier.mediaItemType;
    } else if (child.type === CardView) {
      // TODO: use isLinkDetails
    } else if (child.props.type) {
      return child.props.type;
    }

    return 'file';
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
    const {resizeMode, getItemTypeFromChild, getDimensionsFromMediaItemType} = this;
    const dimensions = getDimensionsFromMediaItemType(getItemTypeFromChild(child));

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
