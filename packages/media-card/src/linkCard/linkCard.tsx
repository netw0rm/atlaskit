import * as React from 'react';
import {Component} from 'react';
import {Subscription} from 'rxjs/Subscription';
import {Context, CardAction, LinkItem, LinkDetails} from '@atlaskit/media-core';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/fromPromise';

import {LinkCardViewHorizontal} from '..';

export interface LinkCardProps {
  // TODO add link id to interface and use link data provider when supplied else use url preview provider
  // this implies that linkUrl will be optional
  readonly context: Context;
  readonly linkUrl: string;

  readonly height?: number;
  readonly width?: number;

  readonly menuActions?: Array<CardAction>;

  readonly type?: 'normal' | 'small';
  readonly onClick?: (event: Event, item: LinkItem) => void;
}

export interface LinkCardState {
  readonly subscription: Subscription;
  readonly loading: boolean;

  readonly linkItem?: LinkItem;
  readonly error?: Error;
}

export class LinkCard extends Component <LinkCardProps, LinkCardState> {
  static defaultProps: Partial<LinkCardProps> = {
    width: 435,
    height: 116,
    menuActions: []
  };

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
    const {state} = this;
    if (state && state.linkItem) {
      return this.renderLink(state.linkItem.details);
    } else {
      return this.renderNoLinkItem();
    }
  }

  renderLink(linkDetails: LinkDetails): JSX.Element {
    const {url, title, description, resources} = linkDetails;
    const {icon, thumbnail} = resources;

    const {height, width, menuActions} = this.props;
    const {loading} = this.state;

    return <LinkCardViewHorizontal
      linkUrl={url}
      // fix URLPreview type to make title required
      title={title || ''}

      description={description}
      thumbnailUrl={thumbnail && thumbnail.url}
      iconUrl={icon && icon.url}

      height={height}
      width={width}

      loading={loading}
      menuActions={menuActions}
    />;
  }

  private renderNoLinkItem() {
    // TODO FIL-3892 FIL-3893 render loading/error state 
    return <div>This is the loading/error state</div>;
  }
};

export default LinkCard;
;
