import * as React from 'react';
import {Component, MouseEvent} from 'react';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {Context, CardAction, CardActionType, MediaItemType, LinkItem, LinkDetails} from '@atlaskit/media-core';
import MoreIcon from '@atlaskit/icon/glyph/more';

import {LinkCardViewHorizontal} from '..';
import {Dropdown} from '../dropdown/dropdown';

export interface LinkCardProps {
  // TODO add link id to interface and use link data provider when supplied else use url preview provider
  // this implies that linkUrl will be optional
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

  componentDidMount(): void {
    this.updateState(this.props);
  }

  componentWillReceiveProps(nextProps: LinkCardProps, nextContext: any): void {
    if (this.shouldUpdateState(nextProps)) {
      this.updateState(nextProps);
    }
  }

  componentWillUnmount(): void {
    this.unsubscribe();
  }

  private shouldUpdateState(nextProps: LinkCardProps): boolean {
    return (nextProps.context !== this.props.context);
  }

  private updateState(props: LinkCardProps): void {
    this.unsubscribe();

    const {context, linkUrl} = this.props;

    const urlPreviewProvider = context.getUrlPreviewProvider(linkUrl);
    const provider = urlPreviewProvider.observable();

    this.setPartialState({loading: true});

    this.setPartialState({
      subscription: provider.subscribe({
        next: (urlPreview) => {
          const linkItem: LinkItem = {
            type: 'link',
            details: {id: '', ...urlPreview}
          };

          this.setPartialState({
            linkItem: linkItem,
            error: undefined,
            loading: false
          });
        },
        complete: () => {
          this.setPartialState({
            loading: false
          });
        },
        error: (error) => {
          this.setPartialState({
            error: error,
            loading: false
          });
        }
      })
    });
  }

  private setPartialState(partialState: Partial<LinkCardState>, callback?: () => any) {
    this.setState((previousState, props) => {
      return {...previousState, ...partialState};
    }, callback);
  }

  private unsubscribe(): void {
    this.state && this.state.subscription && this.state.subscription.unsubscribe();
  }

  render() {
    if (this.state) {
      const {linkItem} = this.state;

      if (linkItem) {
        return this.renderLink(linkItem.details);
      } else {
        return this.renderNoLinkItem();
      }
    } else {
      // TODO remove text in div
      return <div>This an empty state</div>;
    }
  }

  renderLink(linkDetails: LinkDetails): JSX.Element {
    // TODO pass through other linkDetails to LinkCardViewHorizontal
    const {url, title} = linkDetails;

    const {height, width} = this.props;
    const {loading} = this.state;

    return <LinkCardViewHorizontal
      linkUrl={url}
      title={title}

      height={height}
      width={width}
      loading={loading}
    />;
  }

  private renderNoLinkItem() {
    // TODO render error state 
    return <div />;
  }
};

export default LinkCard;
