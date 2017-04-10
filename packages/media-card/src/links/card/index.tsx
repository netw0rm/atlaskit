import * as React from 'react';
import { Component } from 'react';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Context, CardAction, TrelloBoardLinkApp, UrlPreview } from '@atlaskit/media-core';

import { CardDimensions, CardAppearance, OnLoadingChangeFunc, OnLoadingChangeState, OnSelectChangeFunc, CardEvent, CardProcessingStatus } from '../../card';
import { LinkCardGenericView } from '../cardGenericView';
import { LinkCardPlayer } from '../cardPlayerView';
import { LinkCardTrelloBoardView } from '../apps/trello';
import { LinkCardViewSmall } from '../cardViewSmall';
import { LinkCardImageView } from '../cardImageView';

export interface LinkFromId {
  readonly id: string;
  readonly collectionName: string;
}

export interface LinkCardProps {
  readonly context: Context;
  readonly link: string | LinkFromId;

  readonly dimensions?: CardDimensions;

  readonly actions?: Array<CardAction>;

  readonly appearance?: CardAppearance;

  // TODO FIL-3962 update card to fire click, hover, selectChange and loading change callbacks
  readonly onClick?: (result: CardEvent) => void;
  readonly onHover?: (result: CardEvent) => void;
  readonly onSelectChange?: OnSelectChangeFunc;
  readonly onLoadingChange?: OnLoadingChangeFunc;
}

export interface LinkCardState {
  readonly subscription?: Subscription;
  readonly processingStatus: CardProcessingStatus;
  readonly urlPreview?: UrlPreview;
  readonly error?: Error;
}

export class LinkCard extends Component<LinkCardProps, LinkCardState> {
  static defaultProps: Partial<LinkCardProps> = {
    actions: [],
    onLoadingChange: () => {}
  };

  state: LinkCardState = {
    processingStatus: 'loading'
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
      return context.getMediaItemProvider(link.id, 'link', link.collectionName)
        .observable()
        .map(linkItem => linkItem.details);
    }
  }

  private stateToProcessingStatus(): OnLoadingChangeState {
    const {processingStatus, error, urlPreview} = this.state;
    return {
      type: processingStatus,
      payload: error ? error : urlPreview
    };
  }

  private updateState(props: LinkCardProps): void {
    this.unsubscribe();
    this.setPartialState({ processingStatus: 'loading' });

    const onLoadingChange = this.props.onLoadingChange as OnLoadingChangeFunc;
    onLoadingChange(this.stateToProcessingStatus());

    this.setPartialState({
      subscription: this.observable().subscribe({
        next: urlPreview => {
          this.setPartialState(
            { urlPreview, error: undefined, processingStatus: 'processing'},
            () => onLoadingChange(this.stateToProcessingStatus())
          );
        },
        complete: () => {
          this.setPartialState(
            { processingStatus: 'complete' },
            () => onLoadingChange(this.stateToProcessingStatus())
          );
        },
        error: (error) => {
          this.setPartialState(
            { error, processingStatus: 'error' },
            () => onLoadingChange(this.stateToProcessingStatus())
          );
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
    const { state, props } = this;

    if (state && state.urlPreview) {
      const urlPreview = state.urlPreview as UrlPreview;
      const { resources } = urlPreview;
      const { appearance } = props;

      // If appearance is passed we prioritize that instead of the better looking one
      if (appearance === 'small') {
        return this.renderSmallLink(urlPreview);
      }

      if (appearance === 'image') {
        return this.renderLinkCardImage(urlPreview);
      }

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
    const { title, site,  description, resources } = urlPreview;
    const { thumbnail, icon, player } = resources;

    const playerUrl = player && player.url ? player.url : '';
    const iconUrl = icon && icon.url;
    const thumbnailUrl = thumbnail && thumbnail.url;

    return <LinkCardPlayer
      linkUrl={playerUrl}
      title={title}

      site={site}
      description={description}
      thumbnailUrl={thumbnailUrl}
      iconUrl={iconUrl}
      playerUrl={playerUrl}
    />;
  }

  private renderGenericLink(urlPreview: UrlPreview): JSX.Element {
    const { url, title, site, description, resources } = urlPreview;
    const icon = resources ? resources.icon : undefined;
    const thumbnail = resources ? resources.icon : undefined;

    const { dimensions, actions, appearance } = this.props;
    const { processingStatus } = this.state;

    return <LinkCardGenericView
      linkUrl={url}
      title={title}

      site={site}
      description={description}
      thumbnailUrl={thumbnail && thumbnail.url}
      iconUrl={icon && icon.url}

      dimensions={dimensions}

      appearance={appearance}
      loading={processingStatus === 'loading'}
      actions={actions}
    />;
  }

  private renderSmallLink(urlPreview: UrlPreview): JSX.Element {
    const { url, title, site, resources } = urlPreview;
    const thumbnail = resources ? resources.icon : undefined;

    const { dimensions, actions } = this.props;
    const { processingStatus } = this.state;

    return <LinkCardViewSmall
      linkUrl={url}
      title={title}
      site={site}

      thumbnailUrl={thumbnail && thumbnail.url}
      width={dimensions && dimensions.width}

      loading={processingStatus === 'loading'}
      actions={actions}
    />;
  }

  private renderLinkCardImage(urlPreview: UrlPreview): JSX.Element {
    const { url, title, site, resources } = urlPreview;
    const { thumbnail, icon } = resources || {thumbnail: '', icon: ''};
    const { dimensions, actions, appearance } = this.props;
    const { processingStatus } = this.state;

    return <LinkCardImageView
      linkUrl={url}
      title={title}
      site={site}
      thumbnailUrl={thumbnail && thumbnail.url}
      appearance={appearance}
      dimensions={dimensions}
      loading={processingStatus === 'loading'}
      actions={actions}
      iconUrl={icon && icon.url}
    />;
  }
};

export default LinkCard;
