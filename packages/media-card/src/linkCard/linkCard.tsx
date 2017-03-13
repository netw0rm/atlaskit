import * as React from 'react';
import { Component } from 'react';
import { Subscription } from 'rxjs/Subscription';
import { Context, CardAction, LinkItem } from '@atlaskit/media-core';
import { Observable } from 'rxjs/Observable';
import { UrlPreview } from '@atlaskit/media-core';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/fromPromise';
import { TrelloBoardLinkApp } from '@atlaskit/media-core';
import { LinkCardTrelloView } from '../LinkCardTrelloView';
import { LinkCardPlayer } from '../linkCardPlayer';

import { LinkCardViewHorizontal } from '../linkCardViewHorizontal/linkCardViewHorizontal';

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

  readonly type?: 'normal' | 'small';
  readonly onClick?: (event: Event, item: LinkItem) => void;
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

  private observable(): Observable<UrlPreview> {
    const { context, link } = this.props;

    if (typeof link === 'string') {
      return context.getUrlPreviewProvider(link).observable();
    } else {
      return context.getMediaItemProvider(link.id, 'link', link.collection).observable()
        .map(linkItem => linkItem.details);
    }
  }

  private updateState(props: LinkCardProps): void {
    // const { context, link } = this.props;
    // const isLinkFromId = (link) => (link as LinkFromId).id !== undefined;
    // const isLinkItem = (item) => (item as LinkItem).details !== undefined;

    this.unsubscribe();

    // const { context, link } = this.props;
    // const provider: { subscribe: Function } = isLinkFromId(link)
    //   ? context.getMediaItemProvider((link as LinkFromId).id, 'link', (link as LinkFromId).collection).observable()
    //   : context.getUrlPreviewProvider(link as string).observable();

    this.unsubscribe();
    this.setPartialState({ loading: true });

    this.setPartialState({
      subscription: this.observable().subscribe({
        next: urlPreview => {
          this.setPartialState({ urlPreview, error: undefined, loading: false });
        },
        complete: () => {
          this.setPartialState({ loading: false });
        },
        error: (error) => {
          this.setPartialState({ error, loading: false });
        }
      })
    });
  }

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
      const { urlPreview } = state;
      const { resources } = urlPreview;

      if (resources) {
        if (resources.app) {
          const { app } = resources;

          switch (app.type) {
            case 'trello_board':
              return this.renderTrelloBoard(app, resources.icon ? resources.icon.url : undefined);
          }
        } else if (resources.player) {
          return this.renderPlayer(urlPreview);
        }
      }

      return this.renderLink(urlPreview);
    } else {
      return null;
    }
  }

  private renderTrelloBoard(app: TrelloBoardLinkApp, iconUrl?: string): JSX.Element {
    return <LinkCardTrelloView
      linkUrl={app.url}
      title={app.name}
      thumbnailUrl={app.background}
      iconUrl={iconUrl}
      lists={app.lists}
      members={app.member}
    />;
  }

  private renderPlayer(urlPreview: UrlPreview): JSX.Element {
    const { thumbnail, icon, player } = urlPreview.resources;

    return <LinkCardPlayer
      linkUrl={player.url}
      title={urlPreview.title}
      description={urlPreview.description}
      thumbnailUrl={thumbnail ? thumbnail.url : undefined}
      iconUrl={icon ? icon.url : undefined}
      playerUrl={player.url}
    />;
  }

  renderLink(urlPreview: UrlPreview): JSX.Element {
    const { url, title, description, resources } = urlPreview;
    const icon = resources ? resources.icon : undefined;
    const thumbnail = resources ? resources.icon : undefined;

    const { height, width, menuActions } = this.props;
    const { loading } = this.state;

    return <LinkCardViewHorizontal
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
;
