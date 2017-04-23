import * as React from 'react';
import { Component } from 'react';
import { TrelloBoardLinkApp, UrlPreview } from '@atlaskit/media-core';
import { SharedCardProps, CardProcessingStatus } from '../..';
import { LinkCardGenericView } from '../cardGenericView';
import { LinkCardPlayer } from '../cardPlayerView';
import { LinkCardTrelloBoardView } from '../apps/trello';
import { LinkCardViewSmall } from '../cardViewSmall';
import { LinkCardImageView } from '../cardImageView';

export interface LinkCardProps extends SharedCardProps {
  details?: UrlPreview;
  status: CardProcessingStatus;
  error?: Error;
}

export class LinkCard extends Component<LinkCardProps, {}> {
  render(): JSX.Element | null {
    const {appearance, error} = this.props;

    if (error) {
      return null;
    }

    // If appearance is passed we prioritize that instead of the better looking one
    if (appearance === 'small') {
      return this.renderSmallLink();
    }

    if (appearance === 'image') {
      return this.renderLinkCardImage();
    }

    if (this.resources && this.resources.app) {
      return this.renderApplicationLink();
    } else if (this.resources && this.resources.player) {
      return this.renderPlayerLink();
    }

    return this.renderGenericLink();
  }

  private renderApplicationLink(): JSX.Element {
    const {app, icon} = this.resources;

    switch (app && app.type) {
      case 'trello_board':
        return this.renderTrelloBoard(app as TrelloBoardLinkApp, icon && icon.url);
      default:
        return this.renderGenericLink();
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

  private renderPlayerLink(): JSX.Element {
    const { title, site, description } = this.urlPreview;
    const { player } = this.resources;

    const playerUrl = player && player.url ? player.url : '';

    return <LinkCardPlayer
      linkUrl={playerUrl}
      title={title}

      site={site}
      description={description}
      thumbnailUrl={this.thumbnailUrl}
      iconUrl={this.iconUrl}
      playerUrl={playerUrl}
    />;
  }

  private renderGenericLink(): JSX.Element {
    const { url, title, site, description } = this.urlPreview;
    const { dimensions, actions, appearance } = this.props;

    return <LinkCardGenericView
      linkUrl={url}
      title={title}
      site={site}
      description={description}
      thumbnailUrl={this.thumbnailUrl}
      iconUrl={this.iconUrl}
      dimensions={dimensions}
      appearance={appearance}
      loading={this.isLoading}
      actions={actions}
    />;
  }

  private renderSmallLink(): JSX.Element {
    const { url, title, site } = this.urlPreview;
    const { dimensions, actions } = this.props;

    return <LinkCardViewSmall
      linkUrl={url}
      title={title}
      site={site}
      thumbnailUrl={this.iconUrl}
      width={dimensions && dimensions.width}
      loading={this.isLoading}
      actions={actions}
    />;
  }

  private renderLinkCardImage(): JSX.Element {
    const { url, title, site } = this.urlPreview;
    const { dimensions, actions, appearance } = this.props;

    return <LinkCardImageView
      linkUrl={url}
      title={title}
      site={site}
      thumbnailUrl={this.thumbnailUrl}
      appearance={appearance}
      dimensions={dimensions}
      loading={this.isLoading}
      actions={actions}
      iconUrl={this.iconUrl}
    />;
  }

  private get resources() {
    const { resources } = this.urlPreview;

    return resources || {};
  }

  private get urlPreview() {
    const defaultUrlPreview: UrlPreview = {type: '', url: '', title: ''};
    const urlPreview = this.props.details;

    // We provide a defaultUrlPreview in order to conform what the card is expecting and show the right loading status
    return urlPreview || defaultUrlPreview;
  }

  private get thumbnailUrl() {
    const { thumbnail } = this.resources;

    // TODO: Should we default here to 'this.iconUrl'?
    return thumbnail ? thumbnail.url : undefined;
  }

  private get iconUrl() {
    const { icon } = this.resources;

    return icon ? icon.url : undefined;
  }

  private get isLoading(): boolean {
    const {status} = this.props;
    return status === 'loading' || status === 'processing';
  }
};

export default LinkCard;
