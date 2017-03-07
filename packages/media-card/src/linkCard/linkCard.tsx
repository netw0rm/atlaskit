import * as React from 'react';
import {Component, MouseEvent} from 'react';
import {Subscription} from 'rxjs/Subscription';
import {Context, CardAction, CardActionType, LinkItem, LinkDetails} from '@atlaskit/media-core';
import MoreIcon from '@atlaskit/icon/glyph/more';

import {Ellipsify} from '..';
import {Dropdown} from '../dropdown/dropdown';

export interface LinkCardProps {
  readonly context: Context;
  readonly linkUrl: string;
  readonly title: string;

  readonly height?: number;
  readonly width?: number;

  readonly menuActions?: Array<CardAction>;

  readonly type?: 'normal' | 'small';
  readonly onClick?: (event: Event, item: LinkItem) => void;
  readonly onHover?: (event: any) => void;
  readonly onError?: (error: Error) => void;
}

export interface LinkCardState {
  readonly subscription: Subscription;
  readonly loading: boolean;

  readonly linkItem?: LinkItem;
  readonly error?: Error;
}

export class LinkCard extends Component <LinkCardProps, LinkCardState> {
  private clickDetector: (e: Event) => void;

  static get defaultProps() {
    const menuActions: Array<CardAction> = [];

    return {
      width: 435,
      height: 116,
      menuActions
    };
  }

  constructor(props: LinkCardProps) {
    super(props);
  }

  render() {
    if (this.state) {
      const {linkItem} = this.state;

      if (linkItem) {
        // switch (linkItem.type) {
        //   case 'file':
        //     return this.renderFile(item.details);
        //   case 'link':
        //     return this.renderLink(item.details);
        //   default:
        //     return this.renderNoMediaItem();
        // }
      } else {
        return this.renderNoLinkItem();
      }
    } else {
      return <div>This is an empty state</div>;
    }
  }

  private renderLink() {

  }

  private renderNoLinkItem() {
    return <div />;
  }
};

export default LinkCard;
