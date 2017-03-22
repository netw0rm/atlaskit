import * as React from 'react';
import { Component } from 'react';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Context, CardAction, LinkItem, TrelloBoardLinkApp, CardSize, UrlPreview } from '@atlaskit/media-core';

import { LinkCardTrelloBoardView } from '../apps/trello';
import { LinkCardGenericView } from '../cardGenericView';
import { LinkCardPlayer } from '../cardPlayerView';

export interface OnLoadingChangeFunc {
  (state: LinkCardState):  void;
}

export interface LinkFromId {
  readonly id: string;
  readonly collection: string;
}

export interface LinkCardProps {
  readonly context: Context;
  readonly link: string | LinkFromId;

  readonly height?: number;
  readonly width?: number;

  readonly menuActions?: Array<CardAction>;

  readonly type?: CardSize;
  readonly onClick?: (event: Event, item: LinkItem) => void;
  readonly onLoadingChange?: OnLoadingChangeFunc;
}

export interface LinkCardState {
  readonly subscription: Subscription;
  readonly loading: boolean;

  readonly urlPreview?: UrlPreview;
  readonly error?: Error;
}

export class LinkCard extends Component<LinkCardProps, LinkCardState> {
  static defaultProps: Partial<LinkCardProps> = {
    width: 435,
    height: 116,
    menuActions: [],
    onLoadingChange: () => {}
  };

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
    return nextProps.context !== this.props.context || nextProps.link !== this.props.link;
  }

  private observable(): Observable<UrlPreview> {
    const { context, link } = this.props;

    if (typeof link === 'string') {
      return context.getUrlPreviewProvider(link).observable();
    } else {
      return context.getMediaItemProvider(link.id, 'link', link.collection)
        .observable()
        .map(linkItem => linkItem.details);
    }
  }

  private updateState(props: LinkCardProps): void {
    this.unsubscribe();
    this.setPartialState({ loading: true });

    const onLoadingChange = this.props.onLoadingChange as OnLoadingChangeFunc;
    onLoadingChange(this.state);

    this.setPartialState({
      subscription: this.observable().subscribe({
        next: urlPreview => {
          this.setPartialState({ urlPreview, error: undefined, loading: false });
        },
        complete: () => {
          onLoadingChange(this.state);
          this.setPartialState({ loading: false });
        },
        error: (error) => {
          onLoadingChange(this.state);
          this.setPartialState({ error, loading: false });
        }
      })
    });
  }

  // TODO abstract into helper
  private setPartialState(partialState: Partial<LinkCardState>, callback?: () => any) {
    this.setState((previousState, props) => {
      return { ...previousState, ...partialState };
    }, callback);
  }

  private unsubscribe(): void {
    this.state && this.state.subscription && this.state.subscription.unsubscribe();
  }

  render(): JSX.Element | null {
    const { state } = this;

    if (state && state.urlPreview) {
      const urlPreview = state.urlPreview as UrlPreview;
      const { resources } = urlPreview;

      if (resources && resources.app) {
        return this.renderApplicationLink(urlPreview);
      } else if (resources && resources.player) {
        return this.renderPlayerLink(urlPreview);
      }

      return this.renderGenericLink(urlPreview);
    } else {
      // TODO FIL-3893 render loading/error state 
      return null;
    }
  }

  private renderApplicationLink(urlPreview: UrlPreview): JSX.Element {
    const {app, icon} = urlPreview.resources;

    switch (app && app.type) {
      case 'trello_board':
        return this.renderTrelloBoard(app as TrelloBoardLinkApp, icon && icon.url);
      default:
        return this.renderGenericLink(urlPreview);
    }
  }

  private renderTrelloBoard(app: TrelloBoardLinkApp, iconUrl?: string): JSX.Element {
    return <LinkCardTrelloBoardView
      linkUrl={app.url}
      title={app.name}
      thumbnailUrl={app.background}
      iconUrl={iconUrl}
      lists={app.lists}
      members={app.member}
    />;
  }

  private renderPlayerLink(urlPreview: UrlPreview): JSX.Element {
    const { title, description, resources } = urlPreview;
    const { thumbnail, icon, player } = resources;

    const playerUrl = player && player.url ? player.url : '';
    const iconUrl = icon && icon.url;
    const thumbnailUrl = thumbnail && thumbnail.url;

    return <LinkCardPlayer
      linkUrl={playerUrl}
      title={title}
      description={description}
      thumbnailUrl={thumbnailUrl}
      iconUrl={iconUrl}
      playerUrl={playerUrl}
    />;
  }

  renderGenericLink(urlPreview: UrlPreview): JSX.Element {
    const { url, title, description, resources } = urlPreview;
    const icon = resources ? resources.icon : undefined;
    const thumbnail = resources ? resources.icon : undefined;

    const { height, width, menuActions } = this.props;
    const { loading } = this.state;

    return <LinkCardGenericView
      linkUrl={url}
      title={title}

      description={description}
      thumbnailUrl={thumbnail && thumbnail.url}
      iconUrl={icon && icon.url}

      height={height}
      width={width}

      loading={loading}
      menuActions={menuActions}
    />;
  }

  // private renderNoLinkItem() {
  //   // TODO FIL-3892 FIL-3893 render loading/error state 
  //   return <div>This is the loading/error state</div>;
  // }
};

export default LinkCard;
